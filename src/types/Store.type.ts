import { BaseCollectionJson } from "./Base.type";

export type StoreJson = {
	company_id: number;
	creator_id: number;
	id: number;
	name: string;
	code: string;
	phone: string;
	region_id: number;
	sub_region_id: number;
	sub_sub_region_id: number;
	address: string;
	lat: number;
	long: number;
	warehouse_ids?: number[];
	tax_seller_name: string;
	tax_seller_address: string;
	tax_seller_phone: string;
	tax_seller_account_number: string;
	tax_seller_tax_number: string;
	status: number;
	date_created: number;
	date_modified: number;
	link_map: string;
	province: number;
	district: number;
	ward: number;
	country: number;
	road: string;
};

export type StoreFilter = {
	region_id?: number;
	show_web?: SHOW_WEB;
	sort_type?: string;
};

export enum SHOW_WEB {
	hide,
	show,
}

export type StoreListJson = BaseCollectionJson<StoreJson>;
///////////////////////////////////////
