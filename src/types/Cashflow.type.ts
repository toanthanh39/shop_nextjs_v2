import { OrderId } from "./Order.type";

export enum CashflowGroup {
	CASHFLOW_GROUP_SALE = 101, // bán hàng,
	CASHFLOW_GROUP_OUT_OTHER = 299, // khac
}
export enum CashflowreceiptsStatus {
	DRAFT = 1,
	PENDING,
	ACCEPT,
	SUCCSECC = 9,
	CANCEL = 11,
	NEW = 12,
}

export enum CashflowreceiptsDirection {
	RECEIPT = 5, // phiếu thu
	PAYMENT = 10, // phiếu chi
}
export enum CashflowreceiptsMethod {
	CASH = 1,
	TRASNFER = 3,
	COD = 11,
	VNPAY = 15,
	CARD = 19,
	VOUCHER = 9999,
}

export enum CashflowreceiptSource {
	ORDER = 1,
	DELIVERY = 11,
}

export enum CashflowreceiptTarget {
	TARGET_CASHFLOW_RECEIPT = 7, // biên lai dòng tiền
	CUSTOMER = 3, // khách hàng
	ANOTHER = 9,
}
/////////////////////////////////////////////////////
export type CashflowJson = {
	cashflow_group: number;
	company_id: number;
	creator_id: number;
	date_affected: number;
	date_created: number;
	date_modified: number;
	direction: CashflowreceiptsDirection;
	financial_entry: number;
	id: number;
	identifier: string;
	method: number;
	name: string;
	note: string;
	source: number;
	source_id: OrderId;
	status: CashflowreceiptsStatus;
	store_id: number;
	target: number;
	target_id: number;
	target_label: string;
	value: number;
};

export type CashflowCreate = {
	cashflow_group: number;
	direction: CashflowreceiptsDirection;
	method: number;
	source: number;
	source_id: OrderId;
	status: CashflowreceiptsStatus;
	store_id: number;
	target: number;
	target_id: number;
	value: number;
};
