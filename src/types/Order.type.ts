import { BaseCollectionJson } from "./Base.type";
import { PromotionJson } from "./Promotion.type";
import { ProductJson } from "./Product.type";
import { IsUse } from "./Global.type";
import { CouponAddJson } from "./Coupon.type";
import { PaymentBillingJson, PaymentShippingJson } from "./Payment.type";

// enums
export enum ORDER_ACTION {
	ADD = "add",
	UPDATE = "update",
	DELETE = "delete",
	CREATOR = "creator",
	COUPON = "coupon",
	FETCH = "fetch",
	PROMOTION = "promotion",
	UPDATE_DISCOUNT = "update_discount",
	UPDATE_CUSTOMER = "update_customer",
	NOTE = "note",
	UPDATE_PURCHASE_INFOR = "update_purchase_info",
	UPDATE_SELLER = "update_seller",
}

export enum TYPE_SALE {
	EMPLOYEE = "employee",
} //

export enum SERVICE_TYPE {
	NONE,
	PURTCHASE_METHOD_IN_STORE,
	PURTCHASE_METHOD_DELIVERY,
}

export enum ORDER_DISCOUNT_TYPE {
	ORDER_DISCOUNT_TYPE_PRECENT = 1,
	ORDER_DISCOUNT_TYPE_AMOUNT = 2,
}

export enum ORDER_TYPE {
	ORDER_STATUS,
	INVOICE,
}

export enum ORDER_STATUS {
	NEW = 12,
	OPEN = 13,
	CONFIRM = 14,
	PROCESSING = 15,

	SHIPPING = 16,
	SHIPPED = 17,
	RETURNING = 18,
	COMPLETE = 19,
	CANCEL = 21,
}

export enum ORDER_CANCEL_REASON {
	CANCEL_REASON_OUT_OF_STOCK = 1,
	CANCEL_REASON_CUSTOMER_DISCARD = 3,
	CANCEL_REASON_CUSTOMER_DISCONNECT = 5,
	CANCEL_REASON_CUSTOMER_NOT_PAID = 7,
	CANCEL_REASON_DUPLICATE = 9,
	CANCEL_REASON_INCORRECT_ITEM = 11,
	CANCEL_REASON_HIGH_SHIPPING_FEE = 13,
	CANCEL_REASON_DELIVERY_NOT_ONTIME = 15,
	CANCEL_REASON_CUSTOMER_NOT_SATISFY = 17,
	CANCEL_REASON_SYSTEM_ERROR = 19,
	CANCEL_REASON_PARTNER_ERROR = 21,
	CANCEL_REASON_OTHER = 99,
}
////////////////////////////////////
export type OrderId = string | number;

export interface OrderFilter {
	code?: string;
	page?: number;
	limit?: number;
	status?: ORDER_STATUS;
	type?: ORDER_TYPE;
	store_id?: number;
	seller_id?: number;
	seller?: number;
	customer_id?: number;
	is_pos?: boolean;
	customer_token?: string;
	type_sale?: TYPE_SALE;
}

export type OrderJson = {
	company_id: number;
	creator_id: number;
	id: OrderId;
	code: string;
	store_id: number;
	customer_id: number;
	customer_token: string;
	coupons?: any[];
	cancel_reason: number;
	price_sell: number;
	price_shipping: number;
	price_discount: number;
	price_discount_coupon: number;
	price_final: number;
	price_cost: number;
	price_deposit: number;
	price_debt: number;
	price_tax: number;
	promotion_id: number;
	promotions: OrderPromotion[];
	contact_email: string;
	billing_fullname: string;
	billing_phone: string;
	billing_email: string;
	billing_address: string;
	billing_ward: number;
	billing_district: number;
	billing_province: number;
	billing_country: number;
	billing_company: string;
	billing_sub_sub_region_id: number;
	billing_sub_region_id: number;
	billing_region_id: number;
	shipping_fullname: string;
	shipping_phone: string;
	shipping_address: string;
	shipping_ward: number;
	shipping_district: number;
	shipping_province: number;
	shipping_country: number;
	shipping_company: string;
	shipping_full_address?: string;
	warehouse_id: number;
	shipping_carrier: number;
	product_receipt_id_list: number[];
	cashflow_receipt_id_list: number[];
	tax_invoice_id: number;
	quantity: number;
	note: string;
	cod_amount: number;
	status: ORDER_STATUS;
	vnpay_status: boolean;
	tag: string;
	ecom_platform_id: number;
	ecom_platform_type: number;
	ecom_platform_order_id: string;
	ecom_platform_invoice_id: string;
	date_arrived: number;
	date_created: number;
	date_modified: number;
	payment_method: number;
	resource_type: number;
	resource_id: string;
	resource_number: string;
	order_detail: string;
	order_description: string;
	kiotviet_code: string;
	details: {
		data: OrderItemJson[];
		total: number;
	};
	total_payment: number;
	debt: number;
	payments: any[];
	has_invoice: boolean;
	order_custom_discount: number;
	order_custom_value: number;

	// InvoiceJson properties
	billing_firstname: string;
	billing_lastname: string;
	coupondetail: any[] | null;
	date_completed: number;
	date_deleted: number;
	deposit: number;
	ipaddress: number;
	is_deleted: number;
	kiotviet_id: string;
	note_invoice: any;
	promotion_detail: PromotionJson[];
	shipping_firstname: string;
	shipping_lastname: string;
	type: number;
	delivery_detail: any[];

	order_id: number;
	item_discount: number;
	order_discount: number;
	order_custom_type: ORDER_DISCOUNT_TYPE;
	delivery_lits_id: string;
	item_total: number;

	service_type: SERVICE_TYPE;
	seller_id: number;
	// Field custom
	label_seller: string;
};

export type OrderItemJson = {
	order_id: OrderId;
	product_id: number;
	id: number;
	is_use: IsUse;
	item_name: string;
	item_title: string;
	item_quantity: number;
	item_unit_price_original: number;
	item_unit_price: number;
	item_date_deleted: number;
	price_unit_final: number;
	// promotion_id: number;
	promotions: OrderPromotion[];
	price_final: number;
	price_discount: number;
	product_json: ProductJson;
	discount_percent: number;
	item_total: number;
	item_vat: number;
	price_vat: number;
};

export type OrderPromotion = {
	promotion_id: number; // id của loại chường trình promotion
	sale_promotion_id: number; // id của điều kiện promotion
	product_id?: number | string; // id của product nào phát sinh ra promotion (điều kiện)
	item_quantity?: number; // sô lượng sản phẩm
	is_use: IsUse; // có sài cái promotion này không , nếu sài để 1 không sài để 0
	promotion_detail: PromotionJson;
	discount: number;
	code: string;
	id?: number;
};

export type DiscountType = "amount" | "percent";

////////////////////////////////////

export type OrderItemEdit = Pick<OrderItemJson, "product_id" | "id"> & {
	is_use: IsUse;
	item_quantity?: number;
	promotions?: OrderPromotion[];
	order_id?: OrderId;
	product_json?: ProductJson;
};

export type OrderAddEdit = {
	cart_id: OrderId;
	order_id?: OrderId;
	action: ORDER_ACTION;
	details?: OrderItemEdit[];
	customer_token?: string;
	coupons?: CouponAddJson[];
	promotions?: OrderPromotion[];
	type_sale?: TYPE_SALE;
	note_invoice?: {
		invoice_receipt_email: string;
		bill_recipient_name: string;
		company_name: string;
		tax_code: string;
		company_address: string;
	};
	service_type?: SERVICE_TYPE;
	seller_id?: number;
	status?: ORDER_STATUS;
	cancel_reason?: ORDER_CANCEL_REASON;
};

export type OrderAddCoupon = CouponAddJson & {
	order_id: OrderId;

	customer_token?: string;
};

export type OrderCreate = PaymentBillingJson &
	PaymentShippingJson & {
		store_id: number;
		type_sale?: TYPE_SALE;
	};

////////////////////////////////////

export type OrderListJson = BaseCollectionJson<OrderJson>;

////////////////////////////////////

type DefaultDataUpdateProps = Pick<OrderItemEdit, "id"> & {
	product_json: ProductJson;
};

export type ActionOrderUpdate =
	| {
			action: "quantity";
			data: Omit<DefaultDataUpdateProps, "product_json"> &
				Pick<OrderItemJson, "item_quantity">;
	  }
	| {
			action: "variant";
			data: DefaultDataUpdateProps & { produt_variant_json: ProductJson };
	  }
	| {
			action: "use";
			data: Array<{ id: number; is_use: IsUse }>;
	  }
	| {
			action: "add";
			data: { product_json: ProductJson; item_quantity: number };
	  }
	| {
			action: "remove";
			data: { ids: number[] };
	  }
	| {
			action: "promotion";
			data: {
				promotions: OrderPromotion[];
			};
	  };

export type ValidatePromotionProps =
	| {
			on: "item";
			data: {
				promotions: OrderPromotion[];
				order: OrderJson;
				product_json: ProductJson;
			};
	  }
	| {
			on: "body";
			data: {
				promotions: OrderPromotion[];
				order: OrderJson;
			};
	  };
