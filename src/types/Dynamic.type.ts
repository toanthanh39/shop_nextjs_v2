export type Params<D> = {
	params: Promise<D>;
};

export type SearchParams = {
	searchParams: { [key: string]: string };
};
