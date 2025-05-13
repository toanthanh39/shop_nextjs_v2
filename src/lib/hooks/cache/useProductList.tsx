import BaseApi from "@/lib/axios/BaseApi";
import { HookCacheProps } from "@/types/Component";
import { ProductFilter } from "@/types/Product.type";
import { useQueries, useQuery } from "@tanstack/react-query";
import ProductRepo from "@/services/api/repositories/ProductRepo";
import { BaseAccessMode } from "@/types/Base.type";

const STALE_TIME = 60 * 1000;
const RETRY = 2;
export const CACHE_PRODUCTS_HOOK = "cache-products";

type Props = HookCacheProps & {
	filters: ProductFilter;
};
function useProductList({ filters, staleTime, enabled }: Props) {
	return useQuery({
		queryKey: [CACHE_PRODUCTS_HOOK, filters.keyword, filters.store_id],
		queryFn: async () => {
			try {
				return await new ProductRepo({
					accessMode: "PUBLIC",
				}).getAll(filters);
			} catch (error) {
				throw BaseApi.handleError(error);
			}
		},
		staleTime: staleTime ?? STALE_TIME,
		enabled: enabled,
		retry: RETRY,
	});
}

export default useProductList;
