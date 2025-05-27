import { SystemSetting } from "@/types/Shop.type";

export const SystemConst = {
	ROUTE_ERROR_REDIRECT: "/error",

	DEFAULT_SYSTEM_SETTING: {
		lang: "vi",
		store_id: 60026,
		pagination_limit: 48,
		customer_token: "046dfa99ba6f4f7f2b818301145392d1",
		id_ecomplatforms_for_web: "1",
	} as SystemSetting,
} as const;
