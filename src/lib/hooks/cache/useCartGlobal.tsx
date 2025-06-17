import {
	useIsMutating,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

import BaseApi from "@/lib/axios/BaseApi";
import CartRepo from "@/services/api/repositories/CartRepo";
import { HookCacheProps } from "@/types/Component";
import { IsUse } from "@/types/Global.type";
import {
	ActionOrderUpdate,
	ORDER_ACTION,
	OrderItemEdit,
	OrderItemJson,
} from "@/types/Order.type";
import { PaymentAddJson } from "@/types/Payment.type";
import { ProductJson } from "@/types/Product.type";
import {
	PromotionDiscountType,
	PromotionJson,
	PromotionToggleProps,
} from "@/types/Promotion.type";

import OrderCalculator from "@/services/utils/OrderCalculator";
import OrderConvert from "@/services/utils/OrderConvert";

import useSiteSetting from "./useSiteSetting";

type Props = HookCacheProps & {};

type ActionUpdateCouponProps =
	| {
			action: "add";
			data: {
				code: string;
			};
	  }
	| {
			action: "remove";
			data: {
				code: string;
				promotion_detail: PromotionJson;
			};
	  };

type ActionUpdatePromotionBodyProps = {
	action: PromotionToggleProps;
	data: {
		promotions: PromotionJson[];
	};
};

type BuyNowProps = {
	product_json: ProductJson;
	item_quantiy: number;
};

/////////////////////////////////////
const STALE_TIME = Infinity;
export const CACHE_CART_GLOBAL_HOOK = "cart_global";
export const CACHE_CREATE_CART_GLOBAL = "cart_global";
export const CACHE_CART_GLOBAL_LOADING = "cart_global_loading";

export const MUTA_UPDATE_LOADING = "MUTA_UPDATE_LOADING";

const cartError = {
	error_cart_not_exited: "error_cart_not_exited",
	error_action_invalid: "error_action_invalid",
	error_site_global: "error_site_global",
	error_add_promotion_cart: "error_add_promotion_cart",
};

/////////////////////////////////////

function useCartGlobal({ enabled = true }: Props) {
	const {
		data: site,
		isLoading: isLoadingSite,
		error: siteError,
	} = useSiteSetting();

	const { status: authStatus } = useSession();

	const isAuthenticated = authStatus === "authenticated";

	/////////////////////////////////
	const queryClient = useQueryClient();

	const CartRepoInstance = useMemo(() => {
		return new CartRepo({
			accessMode: isAuthenticated ? "PRIVATE" : "PUBLIC",
		});
	}, [isAuthenticated]);
	const OrderCalculatorInstance = new OrderCalculator();

	const isUpdateMutating =
		useIsMutating({
			mutationKey: [MUTA_UPDATE_LOADING],
		}) > 0;

	const enableQueryCart =
		!!site?.customer_token && enabled && authStatus !== "loading";

	/////////////////////////////////
	const {
		data: cart,
		isLoading,
		error,
	} = useQuery({
		queryKey: [CACHE_CART_GLOBAL_HOOK],
		queryFn: async () => {
			try {
				// const session = await getSession();

				// const CartRepoInstance = new CartRepo({
				// 	accessMode: session ? "PRIVATE" : "PUBLIC",
				// });
				const res = await CartRepoInstance.getAll({
					customer_token: isAuthenticated ? undefined : site?.customer_token,
				});
				console.log("🚀 ~ queryFn: ~ res:", res);
				if (res.items.length <= 0) {
					return null;
				}
				return res.items?.[0];
			} catch (error) {
				// throw BaseApi.handleError(error);
				throw error;
			}
		},
		staleTime: STALE_TIME,
		enabled: enableQueryCart,
		refetchOnWindowFocus: "always",
		// retry: 3,

		retry(failureCount, error) {
			const { statusCode, errors } = BaseApi.handleError(error);
			console.log("🚀 ~ retry ~ statusCode:", statusCode);

			if (statusCode === 401) {
				return false;
			}

			if (failureCount < 3) {
				return true;
			}

			return false;
		},
	});

	const { data: isLoadingGlobal } = useQuery({
		queryKey: [CACHE_CART_GLOBAL_LOADING],
		queryFn: async () => {
			return false;
		},
		staleTime: 0,
		enabled: enabled,
		// refetchOnWindowFocus: "always",
		initialData: false,
	});

	/////////////////////////////////
	const createMutation = useMutation({
		mutationFn: async () => {
			try {
				if (!site) {
					throw new Error(cartError.error_site_global);
				}
				// return await createCart(site.customer_token, site.store_id);

				return await CartRepoInstance.create({
					customer_token: site.customer_token,
					store_id: site.store_id,
				});
			} catch (error) {
				console.error("Error in createMutation:", error);
				throw BaseApi.handleError(error);
			}
		},

		onSuccess: (newCart) => {
			queryClient.setQueryData([CACHE_CART_GLOBAL_HOOK], newCart);
		},
	});

	const addMutation = useMutation({
		mutationFn: async ({
			product_id,
			item_quantity,
			promotions = [],
			product_json,
		}: Pick<OrderItemJson, "product_id" | "item_quantity" | "product_json"> & {
			promotions?: PromotionJson[];
		}) => {
			try {
				if (!site) {
					throw new Error(cartError.error_site_global);
				}

				queryClient.setQueryData([CACHE_CART_GLOBAL_LOADING], true, {
					updatedAt: Date.now(),
				});

				const orderPromotions = OrderConvert.convertPromotionToOrderPromotion(
					promotions,
					item_quantity,
					product_id
				);
				const cartGlobal = cart ?? (await createMutation.mutateAsync());

				const orderServerJson = await CartRepoInstance.update({
					action: ORDER_ACTION.ADD,
					cart_id: cartGlobal.id,
					customer_token: site.customer_token,
					details: [
						{
							product_id: product_id,
							promotions: orderPromotions,
							item_quantity: item_quantity,
							is_use: IsUse.USE,
							id: 0,
						},
					],
				});

				const orderClientJson =
					OrderCalculatorInstance.recalculateOrderOnUpdate(cartGlobal, {
						action: "add",
						data: {
							item_quantity: item_quantity,
							product_json: product_json,
						},
					});

				const serverItemMap = new Map(
					orderServerJson.details.data.map((item) => [item.product_id, item.id])
				);

				orderClientJson.details.data = orderClientJson.details.data.map(
					(clientItem) => ({
						...clientItem,
						id: serverItemMap.get(clientItem.product_id) ?? clientItem.id,
					})
				);

				return orderClientJson;
			} catch (error) {
				throw BaseApi.handleError(error);
			} finally {
				queryClient.setQueryData([CACHE_CART_GLOBAL_LOADING], false, {
					updatedAt: Date.now(),
				});
			}
		},
		onSuccess: (updatedCart) => {
			queryClient.setQueryData([CACHE_CART_GLOBAL_HOOK], updatedCart);
			queryClient.setQueryData([CACHE_CART_GLOBAL_LOADING], false, {
				updatedAt: Date.now(),
			});
		},
	});

	const updateMutation = useMutation({
		mutationKey: [MUTA_UPDATE_LOADING, cart?.id],
		mutationFn: async (ac: ActionOrderUpdate) => {
			try {
				if (!site) {
					throw new Error(cartError.error_site_global);
				}

				if (!cart) {
					throw new Error(cartError.error_cart_not_exited);
				}
				let cartGlobal = { ...cart };

				let details: OrderItemEdit[] = [];

				switch (ac.action) {
					case "quantity": {
						const { id, item_quantity, product_id } = ac.data;
						details.push({
							id,
							item_quantity,
							product_id: product_id,
							is_use:
								cartGlobal.details.data.find((i) => i.id === id)?.is_use ??
								IsUse.USE,
						});

						cartGlobal = new OrderCalculator().recalculateOrderOnUpdate(
							cartGlobal,
							{
								action: "quantity",
								data: {
									id: id,
									item_quantity,
									product_id,
								},
							}
						);
						break;
					}

					case "variant": {
						const { id, produt_variant_json } = ac.data;
						details.push({
							id,
							product_id: produt_variant_json.id,

							is_use:
								cartGlobal.details.data.find((i) => i.id === id)?.is_use ??
								IsUse.USE,
						});
						break;
					}

					case "use": {
						details = ac.data.map((d) => ({
							...d,
							item_quantity:
								cartGlobal.details.data.find((i) => i.id === d.id)
									?.item_quantity ?? 0,
						}));
						break;
					}

					case "remove": {
						const { ids } = ac.data;

						const itemRemoves: OrderItemEdit[] = cart.details.data
							.filter((recordItem) => ids.includes(recordItem.id))
							.map((i) => ({
								id: i.id,
								product_id: i.product_id,
								is_use: i.is_use,
								item_quantity: i.item_quantity,
							}));

						// return await removeCartItem(cart.id, site.customer_token, itemRemoves);

						await CartRepoInstance.update({
							action: ORDER_ACTION.DELETE,
							cart_id: cart.id,
							customer_token: site.customer_token,
							details: itemRemoves,
						});

						return OrderCalculatorInstance.recalculateOrderOnUpdate(cart, {
							action: "remove",
							data: { ids: ids },
						});
						break;
					}

					case "coupon": {
						const { coupon, promotion } = ac.data;

						// Xử lý update update promotion trên json order dưới hệ thống
						if (promotion?.is_use === IsUse.USE) {
							await CartRepoInstance.addCoupon({
								order_id: cartGlobal.id,
								code: coupon.code,
								customer_token: site.customer_token,
							});
						} else {
							const { discount_type } = promotion;

							switch (discount_type) {
								case PromotionDiscountType.CART:
									{
										await CartRepoInstance.update({
											cart_id: cart.id,
											customer_token: site.customer_token,
											action: ORDER_ACTION.PROMOTION,
											promotions: cartGlobal.promotions.map((promo) => {
												if (promo.promotion_id === promotion.id) {
													return {
														...promo,
														is_use: IsUse.NOT_USE,
														code: coupon.code,
													};
												}
												return promo;
											}),
										});
									}

									break;

								case PromotionDiscountType.PRODUCT:
									{
										await CartRepoInstance.update({
											cart_id: cartGlobal.id,
											customer_token: site.customer_token,
											action: ORDER_ACTION.UPDATE,
											details: cartGlobal.details.data.map((item) => {
												return {
													...item,
													promotions: item.promotions.map((promo) => {
														if (promo.promotion_id === promotion.id) {
															return {
																...promo,
																is_use: IsUse.NOT_USE,
																code: coupon.code,
															};
														}
														return promo;
													}),
												};
											}),
										});
									}

									break;

								default:
									break;
							}
						}

						return OrderCalculatorInstance.recalculateOrderOnUpdate(
							cartGlobal,
							{
								action: "coupon",
								data: {
									coupon,
									promotion,
								},
							}
						);
						break;
					}

					default:
						throw new Error("error_action_invalid");
				}

				const response = await CartRepoInstance.update({
					action: ORDER_ACTION.UPDATE,
					cart_id: cartGlobal.id,
					customer_token: site.customer_token,
					details,
				});

				return cartGlobal;
			} catch (error) {
				throw BaseApi.handleError(error);
			} finally {
			}
		},
		onSuccess: (updatedCart) => {
			queryClient.setQueryData([CACHE_CART_GLOBAL_HOOK], updatedCart);
		},
	});

	const checkoutMutation = useMutation({
		mutationFn: async (data: PaymentAddJson) => {
			try {
				const result = await CartRepoInstance.checkout(data);
				CartRepoInstance.delete(data.data.cart_id);
				return result;
			} catch (error) {
				throw BaseApi.handleError(error);
			}
		},
		onSuccess: (updatedCart) => {
			queryClient.setQueryData([CACHE_CART_GLOBAL_HOOK], null);
		},
	});

	const buyNowMutaion = useMutation({
		mutationFn: async (data: BuyNowProps) => {
			if (!site) {
				throw new Error(cartError.error_site_global);
			}

			const { item_quantiy, product_json } = data;
			let cartGlobal = cart ?? (await createMutation.mutateAsync());
			const {
				details: { data: items },
			} = cartGlobal;
			const dataItemsUpdate = [...items];

			const itemExited = dataItemsUpdate.find(
				(i) => i.product_id === product_json.id
			);

			if (!itemExited) {
				cartGlobal = OrderCalculatorInstance.recalculateOrderOnUpdate(
					cartGlobal,
					{
						action: "add",
						data: { item_quantity: item_quantiy, product_json: product_json },
					}
				);
			} else {
				cartGlobal = OrderCalculatorInstance.recalculateOrderOnUpdate(
					cartGlobal,
					{
						action: "quantity",
						data: {
							item_quantity: item_quantiy,
							id: itemExited.id,
							product_id: itemExited.product_id,
						},
					}
				);
			}

			if (items.length > 0) {
				cartGlobal = OrderCalculatorInstance.recalculateOrderOnUpdate(
					cartGlobal,
					{
						action: "use",
						data: items.map((i) => ({
							...i,
							is_use: IsUse.NOT_USE,
						})),
					}
				);
			}
			return cartGlobal;
		},

		onSuccess: (updatedCart) => {
			queryClient.setQueryData([CACHE_CART_GLOBAL_HOOK], updatedCart);
		},
	});

	const updatePromotionBodyMutation = useMutation({
		mutationKey: [MUTA_UPDATE_LOADING],
		mutationFn: async ({ action, data }: ActionUpdatePromotionBodyProps) => {
			try {
				const { promotions } = data;
				if (!site) {
					throw new Error(cartError.error_site_global);
				}

				if (!cart) {
					throw new Error(cartError.error_cart_not_exited);
				}

				let isUse = IsUse.USE;

				switch (action) {
					case "remove":
						isUse = IsUse.NOT_USE;
						break;

					case "aplly ":
						isUse = IsUse.USE;

					default:
						break;
				}

				// merge old and new promotion cart
				const cartPromotions = OrderConvert.mergeOrderPromotions(
					promotions,
					cart.promotions,
					isUse
				);
				if (cartPromotions.length <= 0) {
					throw new Error(cartError.error_add_promotion_cart);
				}

				await CartRepoInstance.update({
					action: ORDER_ACTION.PROMOTION,
					cart_id: cart.id,
					customer_token: site.customer_token,
					promotions: cartPromotions,
				});

				return OrderCalculatorInstance.recalculateOrderOnUpdate(cart, {
					action: "promotion",
					data: {
						promotions: cartPromotions,
					},
				});
				// return result;
			} catch (error) {
				throw BaseApi.handleError(error);
			}
		},
		onSuccess: (updatedCart) => {
			queryClient.setQueryData([CACHE_CART_GLOBAL_HOOK], updatedCart);
		},
		retry: 0,
		// retryDelay: 2 * 1000,
	});

	/////////////////////////////////
	const disabled = useMemo(() => {
		return (
			isLoading ||
			isLoadingSite ||
			addMutation.isPending ||
			updateMutation.isPending
		);
	}, [
		isLoading,
		isLoadingSite,
		addMutation.isPending,
		updateMutation.isPending,
	]);

	/////////////////////////////////
	return {
		cart,
		isLoading: isLoading || isLoadingSite || isLoadingGlobal,
		addToCart: addMutation.mutateAsync,
		updateCart: updateMutation.mutateAsync,
		createCart: createMutation.mutateAsync,
		checkout: checkoutMutation.mutateAsync,
		buyNow: buyNowMutaion.mutateAsync,
		// updateCartCoupon: updateCouponMutation.mutateAsync,
		addPromotionToCart: updatePromotionBodyMutation.mutateAsync,

		isAdding:
			createMutation.isPending ||
			addMutation.isPending ||
			updateMutation.isPending,
		isUpdating: updateMutation.isPending || isUpdateMutating,
		isCheckouting: checkoutMutation.isPending,
		isBuyNow: buyNowMutaion.isPending,
		disabled,
	};
}

export default useCartGlobal;
