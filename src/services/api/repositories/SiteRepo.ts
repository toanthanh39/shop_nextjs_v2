import { SystemConst } from "@/common/constants/system";
import server from "@/lib/core/server";
import { SystemSetting } from "@/types/Shop.type";

const TIME_CACHE = 1 * 60 * 1000; // 1 minute
const SITE_HANDLER_TAG = "site_handler_tag";
class SiteServerRepo {
	private readonly URLs = {
		SITE: {
			PRIVATE: process.env.NEXT_PUBLIC_BASE_URL + "/api/site",
		},
	};

	async getSiteSeting() {
		const result = SystemConst.DEFAULT_SYSTEM_SETTING;
		return result;
		return server.get<SystemSetting>(this.URLs.SITE.PRIVATE, {
			cache: "force-cache",
			next: {
				revalidate: TIME_CACHE,
				tags: [SITE_HANDLER_TAG],
			},
		});

		// const result = await fetch(this.URLs.SITE.PRIVATE, {
		// 	cache: "force-cache",
		// 	next: {
		// 		revalidate: TIME_CACHE,
		// 		tags: [SITE_HANDLER_TAG],
		// 	},
		// });

		// const i = await result.json();

		// return i as SystemSetting;
	}
}

export default SiteServerRepo;
