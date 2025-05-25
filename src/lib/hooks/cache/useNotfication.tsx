import { NotificationConst } from "@/common/constants/notification";
import StoryRepo from "@/services/api/repositories/StoryRepo";
import { StoryJson } from "@/types/Story.type";
import { useQueries } from "@tanstack/react-query";

const STALE_TIME = 5 * 60 * 1000;
export const CACHE_NOTIFICATIONS_HOOK = "cache-notfications";

function useNotfication() {
	const queryFilters = [
		NotificationConst.query.new,
		NotificationConst.query.recent,
	];

	const queries = useQueries({
		queries: queryFilters.map((filter) => {
			return {
				queryKey: [CACHE_NOTIFICATIONS_HOOK, filter.collection_id],
				queryFn: async () => {
					const c_id = filter.collection_id as string;
					return await new StoryRepo().getAll({
						collection_id: c_id,
						page: 1,
						tags: filter.tags,
					});
				},
				staleTime: STALE_TIME,
			};
		}),
	});
	const isLoading = queries.some((query) => query.isLoading);
	const refetch = () => {
		queries.forEach((query) => query.refetch());
	};
	const results = {
		new: (queries[0]?.data?.items ?? []) as StoryJson[],
		recent: (queries[1].data?.items ?? []) as StoryJson[],
		total: ((queries[0].data?.total ?? 0) +
			(queries[1].data?.total ?? 0)) as number,
	};

	return {
		results,
		isLoading,
		refetch,
	};
}

export default useNotfication;
