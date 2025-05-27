import messages from "../lib/i18n/messages/vi.json";

declare module "next-intl" {
	interface AppConfig {
		// ...
		Messages: typeof messages;
	}
}
