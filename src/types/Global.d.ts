import messages from "../lib/i18n/messages/vi/index";

// import messages from "../lib/i18n/request";
type Messages = typeof messages;
declare module "next-intl" {
	interface AppConfig {
		// ...
		Messages: Messages;
	}
}
