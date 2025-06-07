import { headers } from "next/headers";

import { Locale } from "@/types/Locale.type";

const i18n = {
	defaultLocale: "vi",
	locales: ["en", "vi"],
} as const;

export async function detectLangForServer() {
	try {
		const _headers = await headers();
		return (_headers.get("lang") as Locale) || i18n.defaultLocale;
	} catch (error) {
		return i18n.defaultLocale;
	}
}

export async function detectHeaderServer(key: string, defaultValue?: string) {
	try {
		const _headers = await headers();
		const result = _headers.get(key);
		return result ?? defaultValue;
	} catch (error) {
		return defaultValue;
	}
}
