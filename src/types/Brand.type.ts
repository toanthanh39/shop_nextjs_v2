import { BaseCollectionJson } from "./Base.type";
import { Filter } from "./Filter.type";

type BrandImage = { url: string };

export type BrandJson = {
	company_id: number;
	id: number;
	images: BrandImage[];
	logo_brand: BrandImage[];
	description: string;
	title: string;
	handle: string;
	present: string;
	key_word: string;
	quote: string;
	creator_id: number;
	status: number;
	is_deleted: number;
	date_created: number;
	date_modified: number;
	date_deleted: number;
	display_order: number;
};

export type BrandFilter = Filter & {
	list_brand_id?: string;
	sort_by?: keyof BrandJson;
	sort_type?: "ASC" | "DESC";
	tags?: string;
};
export type BrandListJson = BaseCollectionJson<BrandJson>;

export type BrandAlphabet = Pick<
	BrandJson,
	"id" | "handle" | "logo_brand" | "title"
>;

export type BrandJsonAlphabet = {
	[key: string]: BrandAlphabet[];
};

export type TopBrandSetting = {
	name: string;
	id_brand: number;
	display: number;
	handle: string;
};

export type BrandAlphabetListJson = {
	items: BrandJsonAlphabet;
	total: number;
	currentpage: number;
	limit: number;
};
