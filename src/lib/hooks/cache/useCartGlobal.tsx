import BaseApi from "@/lib/axios/BaseApi";
import { HookCacheProps } from "@/types/Component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useSiteSetting from "./useSiteSetting";
import {
	ORDER_ACTION,
	OrderAddCoupon,
	OrderItemEdit,
	OrderJson,
	OrderPromotion,
} from "@/types/Order.type";
import { IsUse } from "@/types/Global.type";
import { OrderItemJson } from "@/types/Order.type";
import CartRepo from "@/services/api/repositories/CartRepo";
import OrderConvert from "@/services/utils/OrderConvert";
import { PaymentAccessMode, PaymentAddJson } from "@/types/Payment.type";
import {
	PromotionDiscountType,
	PromotionJson,
	PromotionToggleProps,
} from "@/types/Promotion.type";
import useCartStore from "@/lib/zustand/useCartStore";
import { useMemo } from "react";
import OrderCalculator from "@/services/utils/OrderCalculator";
import { ProductJson } from "@/types/Product.type";

type Props = HookCacheProps & {};

type DefaultDataUpdateProps = Pick<OrderItemEdit, "id">;
type ActionCartUpdate =
	| {
			action: "quantity";
			data: DefaultDataUpdateProps & { product_id: number; quantity: number };
	  }
	| {
			action: "variant";
			data: DefaultDataUpdateProps & { variant_id: number; quantity: number };
	  }
	| {
			action: "use";
			data: Array<
				DefaultDataUpdateProps & { product_id: number; is_use: IsUse }
			>;
	  };

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
	// const setLoadingGlobal = useCartStore((state) => state.setLoading);
	const queryClient = useQueryClient();

	const CartRepoInstance = new CartRepo({ accessMode: "PUBLIC" });
	const OrderCalculatorInstance = new OrderCalculator();

	const {
		data: cart,
		isLoading,
		error,
	} = useQuery({
		queryKey: [CACHE_CART_GLOBAL_HOOK],
		queryFn: async () => {
			try {
				const res = await CartRepoInstance.getAll({
					customer_token: site?.customer_token,
				});
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
		enabled: !!site?.customer_token && enabled,
		refetchOnWindowFocus: "always",
		retry: 3,
	});

	const { data: isLoadingGlobal } = useQuery({
		queryKey: [CACHE_CART_GLOBAL_LOADING],
		queryFn: async () => {
			return false;
		},
		staleTime: 0,
		enabled: enabled,
		// refetchOnWindowFocus: "always",
		retry: 0,
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

				await CartRepoInstance.update({
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

				const resultTest = OrderCalculatorInstance.recalculateOrderOnUpdate(
					cartGlobal,
					{
						action: "add",
						data: {
							item_quantity: item_quantity,
							product_json: product_json,
						},
					}
				);

				return resultTest;
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
		mutationFn: async (ac: ActionCartUpdate) => {
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
						const { id, product_id, quantity } = ac.data;
						details.push({
							id,
							product_id,
							item_quantity: quantity,
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
									item_quantity: quantity,
								},
							}
						);
						break;
					}

					case "variant": {
						const { id, variant_id, quantity } = ac.data;
						details.push({
							id,
							product_id: variant_id,
							item_quantity: quantity,
							is_use:
								cartGlobal.details.data.find((i) => i.id === id)?.is_use ??
								IsUse.USE,
						});
						break;
					}

					case "use": {
						details = ac.data.map((d) => ({
							id: d.id,
							product_id: d.product_id,
							is_use: d.is_use,
							item_quantity:
								cartGlobal.details.data.find((i) => i.id === d.id)
									?.item_quantity ?? 0,
						}));
						break;
					}

					default:
						throw new Error("error_action_invalid");
				}

				const response = CartRepoInstance.update({
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

	const removeMutation = useMutation({
		mutationFn: async ({ ids }: { ids: number[] }) => {
			console.log("🚀 ~ mutationFn: ~ ids:", ids);
			try {
				if (!site) {
					throw new Error(cartError.error_site_global);
				}

				if (!cart) {
					throw new Error(cartError.error_cart_not_exited);
				}

				const itemRemoves: OrderItemEdit[] = cart.details.data
					.filter((recordItem) => ids.includes(recordItem.id))
					.map((i) => ({
						id: i.id,
						product_id: i.product_id,
						is_use: i.is_use,
						item_quantity: i.item_quantity,
					}));

				// return await removeCartItem(cart.id, site.customer_token, itemRemoves);

				CartRepoInstance.update({
					action: ORDER_ACTION.DELETE,
					cart_id: cart.id,
					customer_token: site.customer_token,
					details: itemRemoves,
				});
				return OrderCalculatorInstance.recalculateOrderOnUpdate(cart, {
					action: "remove",
					data: { ids: ids },
				});
			} catch (error) {
				console.error("Error in removeMutation:", error);
				throw BaseApi.handleError(error);
			}
		},
		onSuccess: (updatedCart) => {
			queryClient.setQueryData([CACHE_CART_GLOBAL_HOOK], updatedCart);
		},
	});

	const updateCouponMutation = useMutation({
		mutationFn: async ({ action, data }: ActionUpdateCouponProps) => {
			try {
				if (!site) {
					throw new Error(cartError.error_site_global);
				}

				if (!cart) {
					throw new Error(cartError.error_cart_not_exited);
				}

				if (action === "add") {
					return await CartRepoInstance.addCoupon({
						order_id: cart.id,
						code: data.code,
						customer_token: site.customer_token,
					});
				}

				if (action === "remove") {
					const itemsToRemoveCoupon: OrderItemEdit[] = cart.details.data
						// .filter((item) =>
						// 	item.promotions.some((promo) => promo.code === data.code)
						// )
						.map((item) => ({
							order_id: cart.order_id,
							id: item.id,
							is_use: item.is_use,
							item_quantity: item.item_quantity,
							product_id: item.product_id,
							promotions: item.promotions.filter(
								(promo) => promo.code !== data.code
							),
						}));

					const promoBodyToRemoveCoupon =
						data.promotion_detail.discount_type === PromotionDiscountType.CART
							? cart.promotions.filter((promo) => promo.code !== data.code)
							: [];

					let result = { ...cart };

					if (promoBodyToRemoveCoupon.length > 0) {
						result = await CartRepoInstance.update({
							cart_id: cart.id,
							customer_token: site.customer_token,
							action: ORDER_ACTION.PROMOTION,
							promotions: promoBodyToRemoveCoupon,
						});
					}

					if (itemsToRemoveCoupon.length > 0) {
						result = await CartRepoInstance.update({
							cart_id: cart.id,
							customer_token: site.customer_token,
							action: ORDER_ACTION.UPDATE,
							details: itemsToRemoveCoupon,
						});
					}

					return result;
				}
			} catch (error) {
				throw BaseApi.handleError(error);
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
			let dataItemsUpdate = [...items];

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
						data: { item_quantity: item_quantiy, id: itemExited.id },
					}
				);
			}

			if (items.length > 0) {
				cartGlobal = OrderCalculatorInstance.recalculateOrderOnUpdate(
					cartGlobal,
					{
						action: "use",
						data: items.map((i) => ({
							id: i.id,
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
				const result = OrderCalculatorInstance.recalculateOrderOnUpdate(cart, {
					action: "promotion",
					data: { promotions: cartPromotions },
				});
				return result;
			} catch (error) {
				throw BaseApi.handleError(error);
			}
		},
		onSuccess: (updatedCart) => {
			queryClient.setQueryData([CACHE_CART_GLOBAL_HOOK], updatedCart);
		},
		retry: 2,
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
		removeCartItem: removeMutation.mutateAsync,
		checkout: checkoutMutation.mutateAsync,
		buyNow: buyNowMutaion.mutateAsync,
		updateCartCoupon: updateCouponMutation.mutateAsync,
		addPromotionToCart: updatePromotionBodyMutation.mutateAsync,

		isAdding:
			createMutation.isPending ||
			addMutation.isPending ||
			updateMutation.isPending,
		isUpdating: updateMutation.isPending || updateCouponMutation.isPending,
		isRemoving: removeMutation.isPending,
		isCheckouting: checkoutMutation.isPending,
		isBuyNow: buyNowMutaion.isPending,
		disabled,
		//////////////////////////////
	};
}

export default useCartGlobal;
