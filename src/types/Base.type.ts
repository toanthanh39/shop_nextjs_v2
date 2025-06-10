export enum BaseAccessMode {
	PUBLIC_CLIENT = 1,
	PUBLIC_SERVER = 2,

	PRIVATE_CLIENT = 3,
	PRIVATE_SERVER = 4,

	POS = 5,
}

export enum Alow {
	NOTALOW,
	ALOW,
}

/////////////////////////////////////////////////////////

export interface IBaseRepository<T> {
	getAll(f: unknown, config?: unknown): Promise<BaseCollectionJson<T>>;
	getOne(id: number | string, f?: unknown): Promise<T | null>;
	// create(data: T): Promise<T>;
	// update(id: number | string, data: Partial<T>): Promise<T>;
	// delete(id: number | string): Promise<void>;
}

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
