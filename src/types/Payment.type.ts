import { IsUse } from "./Global.type";
import { OrderId, SERVICE_TYPE, TYPE_SALE } from "./Order.type";

export enum PaymentAccessMode {
	PUBLIC = 1,
	PRIVATE = 2,
}

export type PaymentMethod =
	| "voucher"
	| "transfer"
	| "cash"
	| "vnpay"
	| "card"
	| "cod";

/////////////////////////////////
export type PaymentJson = {
	code: string;
	id: OrderId;
	url_payment?: string;
	invoice_id?: number;
};

export interface defaultPaymentJson
	extends PaymentShippingJson,
		PaymentBillingJson {
	payment_method: PaymentMethod;
	customer_id: number;
	sale_channel: string;
	store_id: number;
	cart_id: OrderId;
	// --------------
	note?: string;
	type_sale?: TYPE_SALE;
	vnp_return_url?: string;
	note_invoice?: {
		invoice_receipt_email: string;
		bill_recipient_name: string;
		company_name: string;
		tax_code: string;
		company_address: string;
	};
}

export type PaymentAddJson =
	| {
			access_mode: PaymentAccessMode.PRIVATE;
			data: PaymentAddJsonPrivate;
	  }
	| {
			access_mode: PaymentAccessMode.PUBLIC;
			data: PaymentAddJsonPublic;
	  };

export interface PaymentAddJsonPublic extends defaultPaymentJson {
	customer_token: string;
}

export interface PaymentAddJsonPrivate extends defaultPaymentJson {}

export interface PaymentAddJsonPrivatePos extends defaultPaymentJson {
	access_mode: PaymentAccessMode.PRIVATE;
	service_type: SERVICE_TYPE;
	seller_id: number;
	using_cod: IsUse;
	delivery_id: string | number;
	delivery_note?: string;
}

export type PaymentShippingJson = {
	shipping_phone: string;
	shipping_address: string;
	shipping_fullname: string;
	shipping_ward: number;
	shipping_district: number;
	shipping_province: number;
	shipping_country: number;
	shipping_firstname: string;
	shipping_lastname: string;
	shipping_email?: string;
	shipping_full_address?: string;
	partner_delivery?: number;
};

export type PaymentBillingJson = {
	billing_fullname: string;
	billing_firstname: string;
	billing_lastname: string;
	billing_phone: string;
	billing_address: string;
	billing_province: number;
	billing_district: number;
	billing_email: string;
	billing_ward: number;
	billing_country: number;
};

export type PaymentCheckoutJson<T> = T & {
	order_id: OrderId;
};

//////////////////////////////////////////

export type CreateTransactionVNpayProps = {
	order_id: OrderId;
	cashflow_receipt_id: number | string;
	return_url: string;
};

export type CreateTransactionVNpayJson = {
	payment_url: string;
};
export interface CheckVnpayResponse {
	status: boolean;
	response_code: string;
	transaction_status: string;
	id: OrderId;
}

export interface ParamsGetURLQRCode {
	transferAmount: number;
	transferContent: string;
	imgWidth?: number;
	imgHeight?: number;
}
