import messages from "../lib/i18n/messages/vi/index";

// import messages from "../lib/i18n/request";

declare module "next-intl" {
	interface AppConfig {
		// ...
		Messages: typeof messages;
	}
}
