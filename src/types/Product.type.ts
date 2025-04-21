import { BaseCollectionJson } from "./Base.type";
import { Filter } from "./Filter.type";
import { DataLanguageCacheJson } from "./Language.type";
import { PromotionJson } from "./Promotion.type";

export enum ProductStatus {
	NOT_ALLOW_SALE,
	ALLOW_SALE,
}

export enum ProductAllowSale {
	NOT_ALLOW_SALE,
	ALLOW_SALE,
}
export enum ProductShowWeb {
	NOT_ALLOW_SALE,
	ALLOW_SALE,
}

export enum IsShowPromotionPrice {
	hide,
	show,
}

export type ProductTagTypeJson =
	| "PRODUCT STRUCT"
	| "PRODUCT DESCRIPTION"
	| "PRODUCT DETAIL"
	| "PRODUCT CARD"
	| "PRODUCT GENDER"
	| "USE_AND_STORAGE"
	| "SHIPPING_AND_RETURNS"
	| "PRODUCT TESTER"
	| "PRODUCT STATUS"
	| "PRODUCT STYLE"
	| "PRODUCT PERFAMER"
	| "PRODUCT SIZE";
////////////////////////////////////////////

export type ProductJson = {
	allow_sale: ProductAllowSale;
	show_web?: ProductShowWeb;

	status: ProductStatus;
	id: number;
	name: string;
	full_name: string;
	sku: string;
	barcode: string;
	handle: string;
	quantity: number;
	brand: ProductBrandJson;
	price: number;
	compare_at_price: number;
	price_min: number;
	price_max: number;
	compare_at_price_min: number;
	compare_at_price_max: number;
	type_id: number;
	images: { url: string; id: number }[];
	tags: ProductTagJson[];
	created_at: number;
	updated_at: number;
	parent_id: number;
	options: ProductOptionJson[];
	count_childs: number;
	summary: string;
	description: string;
	detail: string;

	meta_keyword: string;
	meta_title: string;
	meta_description: string;

	locale_description: DataLanguageCacheJson;
	locale_meta_keyword: DataLanguageCacheJson;
	locale_meta_title: DataLanguageCacheJson;
	locale_meta_description: DataLanguageCacheJson;
	//key client custom for productJson to process promotion
	promotions: PromotionJson[];
	set_promotionids_from_active?: boolean;
	pricePreview: number;
	option_name: string;

	kiotviet_image: string;
	kiotviet_id: number;
	kiotviet_category: number;
	production_year: number;
	origin: string;

	list_childs: number[];
	rate: ProductRating;
	related: ProductRelatedJson[];

	//price discount / price compare
	compare_discount: number;
	compare_discount_percent: number;

	limit_sale: number;
	display_from: number;
	display_to: number;
	collections: any[];

	actuals: ProductActualQuantity | null;

	quantities: Quantitie[];

	child_promotions: ProductChildPromotion[];
};

export type ProductFilter = Filter & {
	show: "web" | "pos";
	store_id?: number;
	list_product_id?: string;
	parent_id?: number;
	show_promotion_price?: IsShowPromotionPrice;
};

export type ProductListJson = BaseCollectionJson<ProductJson>;

////////////////////////////////////////////

export interface ProductChildPromotion {
	product_id: number;
}

export type ProductBrandJson = {
	id: number;
	title: string;
	handle: string;
};

export type ProductTagJson = {
	name: string;
	type: ProductTagTypeJson;
	code: string;
	description: string;
	value: string;
	id: number;

	style?: {
		color: string;
		bg_color: string;
	};
};

export type ProductRelatedJson = {
	code: string;
	name: string;
	type: ProductTagTypeJson;
	items: number[];
};

export type ProductOptionJson = {
	product_id: number;
	option_id: number;
	name: string;
	value: string;
};

export type ProductRating = {
	rate: number;
	count_rate: number;
	count_rate_1: number;
	count_rate_2: number;
	count_rate_3: number;
	count_rate_4: number;
	count_rate_5: number;
};

export type ProductActualQuantity = {
	product_id: number; // id product
	quantity: number; // tổng số tồn kho
	actual_quantity: number; // tổng tồn kho thật sự
};

export interface Quantitie {
	store_id: number;
	quantity: number;
	actual_quantity: number;
	reserved: number;
	in_coming: number;
}
