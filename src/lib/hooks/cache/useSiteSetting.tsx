import { useQuery } from "@tanstack/react-query";

import BaseApi from "@/lib/axios/BaseApi";
import SiteServerRepo from "@/services/api/repositories/SiteRepo";
import { HookCacheProps } from "@/types/Component";

const STALE_TIME = Infinity;
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
				throw BaseApi.handleError(error);
			}
		},
		staleTime: STALE_TIME,
		retry: RETRY,
	});
}

export default useSiteSetting;
