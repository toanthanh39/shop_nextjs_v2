import { useQuery } from "@tanstack/react-query";

import BaseApi from "@/lib/axios/BaseApi";
import SettingRepo from "@/services/api/repositories/SettingRepo";
import { HookCacheProps } from "@/types/Component";

const STALE_TIME = 0;
export const CACHE_TIMESERVER_HOOK = "cache-time-server";
type Props = HookCacheProps & {};

function useTimeServer({ staleTime, enabled = true }: Props) {
	return useQuery({
		queryKey: [CACHE_TIMESERVER_HOOK],
		queryFn: async () => {
			try {
				return (await new SettingRepo().getTimeServer()).time_server;
			} catch (error) {
				throw BaseApi.handleError(error);
			}
		},
		staleTime: staleTime ?? STALE_TIME,
		enabled: enabled,
		initialData: 0,
	});
}

export default useTimeServer;
