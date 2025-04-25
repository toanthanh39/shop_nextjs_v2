import BaseApi from "@/lib/axios/BaseApi";
import { HookCacheProps } from "@/types/Component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useSiteSetting from "./useSiteSetting";
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
import { useMemo } from "react";

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

/////////////////////////////////////
const STALE_TIME = Infinity;
export const CACHE_CART_GLOBAL_HOOK = "cart_global";
export const CACHE_CREATE_CART_GLOBAL = "cart_global";
export const CACHE_CART_GLOBAL_LOADING = "cart_global_loading";

const cartError = {
	error_cart_not_exited: "error_cart_not_exited",
	error_action_invalid: "error_action_invalid",
	error_site_global: "error_site_global",
};

/////////////////////////////////////

function useCartGlobal({ enabled = true }: Props) {
	const { data: site, isLoading: isLoadingSite } = useSiteSetting();
	// const setLoadingGlobal = useCartStore((state) => state.setLoading);
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
		}: Pick<OrderItemJson, "product_id" | "item_quantity"> & {
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

				const cartGlobal = cart;

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

				return await CartRepoInstance.update({
					action: ORDER_ACTION.UPDATE,
					cart_id: cartGlobal.id,
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
					}));

				// return await removeCartItem(cart.id, site.customer_token, itemRemoves);

				return await CartRepoInstance.update({
					action: ORDER_ACTION.DELETE,
					cart_id: cart.id,
					customer_token: site.customer_token,
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
		addCouponToCart: addCouponMutation.mutateAsync,
		checkout: checkoutMutation.mutateAsync,

		isAdding:
			createMutation.isPending ||
			addMutation.isPending ||
			updateMutation.isPending,
		isUpdating: updateMutation.isPending || addCouponMutation.isPending,
		isRemoving: removeMutation.isPending,
		isCheckouting: checkoutMutation.isPending,
		disabled,
		//////////////////////////////
	};
}

export default useCartGlobal;
