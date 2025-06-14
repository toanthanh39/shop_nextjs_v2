import server from "@/lib/core/server";
import { SystemSetting } from "@/types/Shop.type";

const TIME_CACHE = 5 * 60 * 1000; // 1 minute
const SITE_HANDLER_TAG = "site_handler_tag";
class SiteServerRepo {
	private readonly URLs = {
		SITE: {
			PRIVATE: process.env.NEXT_PUBLIC_BASE_URL + "/api/site",
		},
	};

	async getSiteSeting() {
		return server.get<SystemSetting>(this.URLs.SITE.PRIVATE, {
			cache: "force-cache",
			next: {
				revalidate: TIME_CACHE,
				tags: [SITE_HANDLER_TAG],
			},
		});
	}
}

export default SiteServerRepo;
