const prefix = "LOCAL:";
export const LocalConst = {
	storage: {
		wishlist: prefix + "wishlist",
		popup_event: prefix + "popup_event",
		wishlist_browser_id: prefix + "wishlist_browser_id",
		cart_last_time: prefix + "cart_last_time",
		token: prefix + "token",
		orders: prefix + "orders",
		default_address: prefix + "default_address",
		browser_id: prefix + "MAIN:browser_id",
		product_compare: prefix + "CLIENT:product_compare",
		address_shipping: prefix + "address_shipping",
	},
} as const;
