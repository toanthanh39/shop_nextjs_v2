import { Rank } from "./Rank.type";

export enum CustomerGenders {
	NONE = 0,
	MALE = 3,
	FEMALE = 1,
	OTHER = 5,
	UNKNOWN = 7,
}

export enum CustomerAgeRange {
	CHILD = 1,
	YOUNG,
	MIDLLE,
	MIDLLE_2,
	MIDLLE_3,
	ELDERL,
	OVER_ELDERLY,
	UNKNOWN,
}

export enum AddressType {
	HOME = 1,
	WORK,
	OTHER,
}

export enum IsVistor {
	NOT,
	IS,
}
////////////////////////////////////////////
export type CustomerJson = {
	company_id: number;
	user_id: number;
	id: number;
	user_name: string;
	creator_id: number;
	customer_type_id: number;
	code: string;
	full_name: string;
	first_name: string;
	last_name: string;
	gender: CustomerGenders;
	rank: Rank;
	rank_type: number;
	birthday: number;
	email: string;
	phone: string;
	email_verified: number;
	phone_verified: number;
	country: number;
	province: number;
	district: number;
	ward: number;
	road: string;
	address: string;
	region_id: number;
	sub_region_id: number;
	sub_sub_region_id: number;
	tag: string;
	note: string;
	invoicing_detail: string;
	count_order: number;
	point: number;
	money: number;
	tax_buyer_name: string;
	tax_buyer_address: string;
	tax_buyer_phone: string;
	tax_buyer_account_number: string;
	tax_buyer_tax_number: string;
	ignore_auto_upgrade: number;
	order_spent: number;
	order_count: number;
	order_lastdate: number;
	order_lastid: number;
	order_lastnumber: string;
	order_lastspent: number;
	date_created: number;
	datemodified_username: number;
	datemodified_contact: number;
	datemodified_email: number;
	datemodified_phone: number;
	datemodified_edit_user: number;
	date_modified: number;
	date_first_ordered: number;
	date_last_ordered: number;
	status: number;
	isdeleted: number;
	date_deleted: number;
	total_collection: number;
	avartar: number;
	is_visitor: IsVistor;
};
export type CustomerQuickCreateJson = {
	phone?: string; //string
	full_name?: string; //string
	first_name?: string;
	last_name?: string;
	address?: string; //string
	province?: number; //int
	district?: number; //int
	ward?: number; //int
	country?: number;
	gender?: CustomerGenders;
	age_range?: CustomerAgeRange;
	type?: "quick" | "normal";
	birthday?: number | string;
	email?: string;
	company_id?: number;
};

////////////////////////////////////////////
export type CustomerQuickEditJson = {
	first_name: string;
	last_name: string;
	birthday: number;
	email?: string;
	tokenid: string;
	password: string;
	password2: string;
	phone?: string;
	customer_id: number;
};

export type CustomerUsernameEditJson = {
	type: number;
	code?: string;
	user_name: string;
};

export type CustomerPasswordEditJson = {
	old_password: string;
	password: string;
	password2?: string;
};

export type CustomerInforEditJson = Partial<CustomerJson> & {
	id: CustomerJson["id"];
};

export type CustomerEdit =
	| {
			c_mode: "quick";
			data: CustomerQuickEditJson;
	  }
	| {
			c_mode: "username";
			data: CustomerUsernameEditJson;
	  }
	| {
			c_mode: "infor";
			data: CustomerInforEditJson;
	  }
	| {
			c_mode: "password";
			data: CustomerPasswordEditJson;
	  };

////////////////////////////////////////////
