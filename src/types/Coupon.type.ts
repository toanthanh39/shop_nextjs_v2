export type CouponJson = {
	customer_id: number;
	promotion_id: number;
	promotion_coupon_id: number;
	id: number;
	code: string;
	date_created: number;
	date_modified: number;
	date_from: number;
	date_to: number;
	image: string;
	link: string;
	link_detail: string;
	description: string;
	name: string;
	promotion_status: number;
};

export type CouponAddJson = {
	code: string; // code của coupom

	// coupon_campaign_id: number; // id của chương trình coupon
	// coupon_detail: CouponCheckJson;
	// is_use: IsUse;
	// discount?: number;
};

type CouponCheckJson = {
	status: boolean;
	id: number;
	require_subtotal: number;
	ratio: number;
	minimize: number;
	type: "order" | "product";
	value_type: "percent";
	apply_minimize: boolean;
	group: string;
	price_max: number;
	release_date: number;
	code: string; // user input
	un_use: number[];
	coupon_campaign: {
		id: number;
		name: string;
		description: string;
	};
};
