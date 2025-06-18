import { getRequestConfig } from "next-intl/server";

// Helper function to load messages for a specific namespace
async function loadMessagesForNamespace(locale: string, namespace: string) {
	const messages = await import(`./messages/${locale}/${namespace}.json`);
	return messages.default;
}

export default getRequestConfig(async () => {
	const locale = "vi";

	// Load messages dynamically for each namespace
	// const [cartMessages, productMessages, globalMessages] = await Promise.all([
	//   loadMessagesForNamespace(locale, "cart"),
	//   loadMessagesForNamespace(locale, "product"),
	// 	loadMessagesForNamespace(locale, "global"),
	//   loadMessagesForNamespace(locale, "brand"),

	// ]);

	return {
		locale,
		messages: {
			cart: await loadMessagesForNamespace(locale, "cart"),
			product: await loadMessagesForNamespace(locale, "product"),
			global: await loadMessagesForNamespace(locale, "global"),
			brand: await loadMessagesForNamespace(locale, "brand"),
		},
	};
});
