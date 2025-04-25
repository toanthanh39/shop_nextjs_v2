import messages from "@/lib/i18n/request";
const locale = "vi" as const;
declare module "next-intl" {
	interface AppConfig {
		Locale: (typeof locale)[number];
		Messages: typeof messages;
		// Formats: typeof formats;
	}
}
