import { CouponJson } from "./Coupon.type";

export enum PromotionGroup {
	coupon = "coupon",
	invoice = "invoice",
	seasonal = "seasonal",
}

export enum PromotionStatus {
	PROCESSING = 1,
	PENDING = 2,
	DONE = 3,
	INVALID = 4,
}

///////////////////////////////////////////
export type PromotionJson = {
	id: number;
	status: boolean;
	create_date: number;
	req_subtotal: number;
	req_quantity: number;
	discount_value: number;
	discount_type: "product" | "order";
	req_productids: string;
	campaign_info: {
		id: number;
		name: string;
		code: string;
		description: string;
	};
	priority: number;
	is_use?: number;
	end_date: number;
	start_date: number;
	type: number;
	type_time?: number;
	promotion_price: number;
	compare_discount: number;
	group: PromotionGroup;
	req_collectionids: string;
	compare_discount_percent: number;
	// config?: ConfigDealthom;
	discount_value_type: "amount" | "percent";
	allow_multiple_codes: boolean;
	apply_with_other: boolean;
	max_applied: number;
	promotion_discount: number;
	label: {
		name: string;
		name_card: string;
		bg_color?: string;
		text_color?: string;
	};
	codes?: CouponJson[];
};

export type PromotionFilter = {
	type?: "product" | "cart";
	product_ids?: string;
	product_category?: number;
	collection_id?: number;
	subtotal?: number;
};

///////////////////////////////////////////
