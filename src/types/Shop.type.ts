export interface SystemSetting extends LanguageSettingJson {
	store_id: number;
	customer_token: string;
	pagination_limit?: number;
	id_ecomplatforms_for_web: string;
}

type LanguageSettingJson = {
	key?: string;
	label?: string;
	url?: string;
	lang: string;
	version?: string;
};

export type RootProviderProps = {
	children: Readonly<React.ReactNode>;
};

export type ShopProviderProps = {};
