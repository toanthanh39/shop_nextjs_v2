import { Locale } from "@/types/Locale.type";
import { headers } from "next/headers";

export const i18n = {
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

export async function detectTimeServer() {
	try {
		// const _headers = await headers();
		return 0;
	} catch (error) {
		return 0;
	}
}
