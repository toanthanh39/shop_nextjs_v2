import messages from "../lib/i18n/messages/vi/index";

// import messages from "../lib/i18n/request";
type Messages = typeof messages;
declare module "next-intl" {
	interface AppConfig {
		// ...
		Messages: Messages;
	}
}

////////////////////////////////
// preline

import type { IStaticMethods } from "preline/dist";

declare global {
	interface Window {
		// Optional third-party libraries
		_;
		$: typeof import("jquery");
		jQuery: typeof import("jquery");
		DataTable;
		Dropzone;
		VanillaCalendarPro;

		// Preline UI
		HSStaticMethods: IStaticMethods;
	}
}

export {};
