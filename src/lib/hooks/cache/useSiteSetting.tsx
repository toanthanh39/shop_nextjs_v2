import { getSiteSeting } from "@/services/api/handler/server";
import BaseApi from "@/lib/axios/BaseApi";
import { HookCacheProps } from "@/types/Component";
import { useQueries, useQuery } from "@tanstack/react-query";

const STALE_TIME = 60 * 1000;
const RETRY = 2;
export const CACHE_PRODUCTS_HOOK = "cache-site";

type Props = HookCacheProps & {};
function useSiteSetting() {
	return useQuery({
		queryKey: [CACHE_PRODUCTS_HOOK],
		queryFn: async () => {
			try {
				return await getSiteSeting();
			} catch (error) {
				throw BaseApi.handleError(error);
			}
		},
		staleTime: STALE_TIME,
		retry: RETRY,
	});
}

export default useSiteSetting;
