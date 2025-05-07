import BaseApi from "@/lib/axios/BaseApi";
import { HookCacheProps } from "@/types/Component";
import { useQueries, useQuery } from "@tanstack/react-query";
import SiteServerRepo from "@/services/api/repositories/SiteRepo";

const STALE_TIME = 60 * 1000;
const RETRY = 2;
export const CACHE_PRODUCTS_HOOK = "cache-site";

type Props = HookCacheProps & {};
function useSiteSetting() {
	const siteServerInstance = new SiteServerRepo();
	return useQuery({
		queryKey: [CACHE_PRODUCTS_HOOK],
		queryFn: async () => {
			try {
				return await siteServerInstance.getSiteSeting();
			} catch (error) {
				console.log("🚀 ~ queryFn: ~ error:", error);
				throw BaseApi.handleError(error);
			}
		},
		staleTime: STALE_TIME,
		retry: RETRY,
	});
}

export default useSiteSetting;
