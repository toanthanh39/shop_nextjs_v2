import server from "@/lib/core/server";
import { SystemSetting } from "@/types/Shop.type";

const URL_PRIVATE = process.env.NEXT_PUBLIC_BASE_URL + "/api/site";
const TIME_CACHE = 0;
export const SITE_HANDLER_TAG = "site_handler_tag";

export const getSiteSeting = async () => {
	return server.get<SystemSetting>(URL_PRIVATE, {
		cache: "no-store",
		next: {
			revalidate: TIME_CACHE,
			tags: [SITE_HANDLER_TAG],
		},
	});
};
