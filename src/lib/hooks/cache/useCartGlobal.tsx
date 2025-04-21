import BaseApi from "@/lib/axios/BaseApi";
import { HookCacheProps } from "@/types/Component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useSiteSetting from "./useSiteSetting";
import { MockOrderJson } from "@/lib/data/mocks";
import {
	ORDER_ACTION,
	OrderAddCoupon,
	OrderItemEdit,
	OrderJson,
} from "@/types/Order.type";
import { IsUse } from "@/types/Global.type";
import { OrderItemJson } from "@/types/Order.type";
import CartRepo from "@/services/api/repositories/CartRepo";
import OrderConvert from "@/services/utils/OrderConvert";
import { PaymentAccessMode, PaymentAddJson } from "@/types/Payment.type";
import { PromotionJson } from "@/types/Promotion.type";
import useCartStore from "@/lib/zustand/useCartStore";
import { set } from "date-fns";

type Props = HookCacheProps & {};

type ActionUpdateCart = "quantity" | "variant" | "use";

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

/////////////////////////////////////
const STALE_TIME = Infinity;
export const CACHE_CART_GLOBAL_HOOK = "cart_global";
export const CACHE_CREATE_CART_GLOBAL = "cart_global";

/////////////////////////////////////

function useCartGlobal({ enabled = true }: Props) {
	const { data: site, isLoading: isLoadingSite } = useSiteSetting();
	const setLoadingGlobal = useCartStore((state) => state.setLoading);
	const queryClient = useQueryClient();

	const CartRepoInstance = new CartRepo({ accessMode: "PUBLIC" });

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

	/////////////////////////////////
	const createMutation = useMutation({
		mutationFn: async () => {
			try {
				if (!site) {
					throw new Error("error_site_global");
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
		}: Pick<OrderItemJson, "product_id" | "item_quantity"> & {
			promotions?: PromotionJson[];
		}) => {
			try {
				if (!site) {
					throw new Error("error_site_global");
				}

				setLoadingGlobal(true);
				const orderPromotions = OrderConvert.convertPromotionToOrderPromotion(
					promotions,
					item_quantity,
					product_id
				);
				const cartGlobal = cart ?? (await createMutation.mutateAsync());

				// return addToCart(
				// 	product_id,
				// 	item_quantity,
				// 	cartGlobal.id,
				// 	site.customer_token
				// );

				return CartRepoInstance.update({
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
			} catch (error) {
				throw BaseApi.handleError(error);
			} finally {
				setLoadingGlobal(false);
			}
		},
		onSuccess: (updatedCart) => {
			queryClient.setQueryData([CACHE_CART_GLOBAL_HOOK], updatedCart);
		},
	});

	const updateMutation = useMutation({
		mutationFn: async (ac: ActionCartUpdate) => {
			try {
				if (!cart || !site) {
					throw new Error("error_cart_not_exited");
				}
				let details: OrderItemEdit[] = [];

				switch (ac.action) {
					case "quantity": {
						const { id, product_id, quantity } = ac.data;
						details.push({
							id,
							product_id,
							item_quantity: quantity,
							is_use:
								cart.details.data.find((i) => i.id === id)?.is_use ?? IsUse.USE,
						});
						break;
					}

					case "variant": {
						const { id, variant_id, quantity } = ac.data;
						details.push({
							id,
							product_id: variant_id,
							item_quantity: quantity,
							is_use:
								cart.details.data.find((i) => i.id === id)?.is_use ?? IsUse.USE,
						});
						break;
					}

					case "use": {
						details = ac.data.map((d) => ({
							id: d.id,
							product_id: d.product_id,
							is_use: d.is_use,
							item_quantity:
								cart.details.data.find((i) => i.id === d.id)?.item_quantity ??
								0,
						}));
						break;
					}

					default:
						throw new Error("error_action_invalid");
				}

				// return await updateCartItem({
				// 	action: ORDER_ACTION.UPDATE,
				// 	cart_id: cart.id,
				// 	customer_token: site.customer_token,
				// 	details,
				// });

				return await CartRepoInstance.update({
					action: ORDER_ACTION.UPDATE,
					cart_id: cart.id,
					customer_token: site.customer_token,
					details,
				});
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
			try {
				if (!site || !cart) {
					throw new Error("error_site_not_exited");
				}

				if (!cart) {
					throw new Error("error_cart_not_exited");
				}

				const itemRemoves: OrderItemEdit[] = cart.details.data
					.filter((recordItem) => ids.includes(recordItem.id))
					.map((i) => ({
						id: i.id,
						product_id: i.product_id,
						is_use: i.is_use,
					}));

				// return await removeCartItem(cart.id, site.customer_token, itemRemoves);

				return await CartRepoInstance.update({
					action: ORDER_ACTION.DELETE,
					cart_id: cart.id,
					customer_token: site?.customer_token,
					details: itemRemoves,
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

	const addCouponMutation = useMutation({
		mutationFn: async ({ code }: Pick<OrderAddCoupon, "code">) => {
			try {
				if (!site || !cart) {
					throw new Error("error_site_global");
				}

				return await CartRepoInstance.addCoupon({
					cart_id: cart.id,
					code: code,
					customer_token: site.customer_token,
				});
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

	/////////////////////////////////

	return {
		cart,
		isLoading: isLoading || isLoadingSite,
		addToCart: addMutation.mutateAsync,
		updateCart: updateMutation.mutateAsync,
		createCart: createMutation.mutateAsync,
		removeCartItem: removeMutation.mutateAsync,
		addCouponToCart: addCouponMutation.mutateAsync,
		checkout: checkoutMutation.mutateAsync,

		isAdding:
			createMutation.isPending ||
			addMutation.isPending ||
			updateMutation.isPending,
		isUpdating: updateMutation.isPending || addCouponMutation.isPending,
		isRemoving: removeMutation.isPending,
		isCheckouting: checkoutMutation.isPending,
		//////////////////////////////
	};
}

export default useCartGlobal;
