import BaseApi from "@/lib/axios/BaseApi";
import { HookCacheProps } from "@/types/Component";
import { StoreFilter } from "@/types/Store.type";
import { useQuery } from "@tanstack/react-query";
import StoreRepo from "@/services/api/repositories/StoreRepo";
import { BaseAccessMode } from "@/types/Base.type";

const STALE_TIME = 60 * 1000;
export const CACHE_STORES_HOOK = "cache-stores";
type Props = HookCacheProps & {
	filters: StoreFilter;
};
function useStores({ filters, staleTime, enabled = true }: Props) {
	return useQuery({
		queryKey: [CACHE_STORES_HOOK],
		queryFn: async () => {
			try {
				return await new StoreRepo({
					accessMode: BaseAccessMode.PUBLIC_CLIENT,
				}).getAll(filters);
			} catch (error) {
				throw BaseApi.handleError(error);
			}
		},
		staleTime: staleTime ?? STALE_TIME,
		enabled: enabled,
	});
}

export default useStores;
