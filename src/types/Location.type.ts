import { BaseCollectionJson } from "./Base.type";

export type LocationFilter = {
	parent_id?: number | null;
	code?: string | null;
	sort_type?: "ASC" | "DESC";
	sort_by?: string;
};

export type LocationItemJson = {
	location_id: number;
	parent_id: number;
	name: string;
	code: string;
	address: string;
	primary: number;
	type: number;
	deprecated: number;
	is_deleted: number;
};

export type LocationListJson = BaseCollectionJson<LocationItemJson>;
