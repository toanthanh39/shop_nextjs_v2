import { getRequestConfig } from "next-intl/server";

// Helper function to load messages for a specific namespace
async function loadMessagesForNamespace(locale: string, namespace: string) {
	const messages = await import(`./messages/${locale}/${namespace}.json`);
	return messages.default;
}

export default getRequestConfig(async () => {
	const locale = "vi";

	// Load messages dynamically for each namespace
	const cartMessages = await loadMessagesForNamespace(locale, "cart");
	const productMessages = await loadMessagesForNamespace(locale, "product");

	return {
		locale,
		messages: {
			cart: cartMessages,
			product: productMessages,
		},
	};
});
