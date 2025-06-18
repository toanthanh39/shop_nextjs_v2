import { SystemSetting } from "@/types/Shop.type";

export const SystemConst = {
	ROUTE_ERROR_REDIRECT: "/error",

	DEFAULT_SYSTEM_SETTING: {
		lang: "vi",
		store_id: 632001,
		pagination_limit: 48,
		customer_token: "",
		id_ecomplatforms_for_web: "1",
	} as SystemSetting,
} as const;
