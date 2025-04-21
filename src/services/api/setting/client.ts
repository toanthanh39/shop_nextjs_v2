import client from "@/lib/core/client";
import server, { Config } from "@/lib/core/server";
import { SettingCollectionJson, SettingJson } from "@/types/Setting.type";
import Helper from "@/utils/helper";

const URL_PUBLIC = process.env.NEXT_PUBLIC_API_BASE_URL + "/settings/public";
const DOMAIN = process.env.NEXT_PUBLIC_API_BASE_DOMAIN;

// client
export const getSetting = async (key: string) => {
	const params = {
		domain: DOMAIN,
		lang: "vi",
		key: key,
	};
	return client.get<SettingJson<string>>(URL_PUBLIC, {
		params: params,
	});
};

export const getMultiSetting = async (keys: string) => {
	const params = {
		domain: DOMAIN,
		lang: "vi",
		keys: keys,
	};
	return client.get<SettingJson<string>>(URL_PUBLIC, {
		params: params,
	});
};
