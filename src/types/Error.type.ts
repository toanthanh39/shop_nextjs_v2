export type ErrorServer = {
	errors: string[];
	status: number;
	error_detail?: ErrorDetail[];
	active_phone?: string;
	time?: number;
};

export type ErrorDetail = {
	[errorType: string]: number[] | any;
};
