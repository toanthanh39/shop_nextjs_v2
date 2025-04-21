export enum BaseAccessMode {
	PUBLIC_CLIENT = 1,
	PUBLIC_SERVER = 2,

	PRIVATE_CLIENT = 3,
	PRIVATE_SERVER = 4,

	POS = 5,
}

/////////////////////////////////////////////////////////
export type BaseCollectionJson<ModelJson> = {
	items: ModelJson[];
	total: number;
	currentpage: number;
	limit: number;
};

export type BaseCollectionNoPagingJson = {
	steps: number;
	approve_name: string;
	approve: boolean;
};

export interface BaseRepoParams {
	accessMode: "PRIVATE" | "PUBLIC";
}
export type BaseAccess =
	| "PUBLIC_CLIENT"
	| "PUBLIC_SERVER"
	| "PRIVATE_CLIENT"
	| "PRIVATE_SERVER"
	| "POS";

export type BaseCollectionFetchingJson<ModelJson> = ModelJson[];
