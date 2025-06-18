export type SignupStatusJson =
	| "CUSTOMER_ACTIVATED"
	| "CUSTOMER_ALREADY"
	| "CUSTOMER_UNACTIVATED"
	| "REGISTER_SUCCESS"
	| "CUSTOMER_ALREADY_CREATED";
export type VerfiyStatusJson =
	| "CUSTOMER_ACTIVATED"
	| "CUSTOMER_ALREADY"
	| "CUSTOMER_NOTFOUND"
	| "VERIFY_NO_ERROR";

export type VerifyErrorJson =
	| "ERROR_CUSTOMER_NOTFOUND"
	| "ERROR_OTP_INVALID"
	| "ERROR_CUSTOMER_ACTIVATED"
	| "ERROR_ACTIVATED_CUSTOMER"
	| "ERROR_DESTINATION_VERIFIED"
	| "ERROR_VERIFIED_DESTINATION";
////////////////////////////////
export type User = {
	avatar: any;
	avatar_file_id: number;
	company_id: number;
	date_created: number;
	date_last_login: number;
	date_modified: number;
	full_name: string;
	id: number;
	screenname: string;
};
export type Customer = {
	email: string;
	id: number;
	phone: string;
	status: number;
};
export type Company = {
	base_quota: any;
	customer: Customer;
	domain: string;
	email: string;
	id: number;
	kyc_status: number;
	name: string;
	owner: number;
	phone: string;
	quota: any[];
	region: number;
	screenname: string;
	status: number;
	employee?: {
		id: number;
		kyc_status: number;
		name: string;
		owner: number;
		phone: string;
		quota: any[]; // Nếu bạn biết rõ kiểu dữ liệu trong mảng quota, hãy thay thế "any" bằng kiểu phù hợp.
		region: number;
		screenname: string;
		status: number;
	};
};
export type LoginJson = {
	company: Company;
	jwt: string;
	user: User;
	role: string;
	status: string;
	first_login: boolean;
	active_phone?: string;
};

export type AccountJson = {
	company: Company;
	jwt: string;
	user: User;
	role: string;
	status: string;
};

export type LoginPostJson = {
	account_id: string;
	password: string;
	hostname?: string;
	version?: string;
	platform?: 1;
	no_cache?: 1;
};

export type LoginEmailPostJson = LoginPostJson & {
	email: string;
};

export type LoginAccountIdPostJson = LoginPostJson & {
	account_id: string;
};
export type loginACPostJson = {
	code: string;
};
export type SignupJson = {
	status: SignupStatusJson;
	otp_quota?: number;
	otp_timeout?: number;
	otp_used?: number;
};
export type SignupPostJson = {
	email: string;
	password: string;
	phone: string;
	first_name: string;
	last_name: string;
	birthday: any;
	password2: string;
};

export type ForgotPasswordPostJson = {
	account_id: string;
	hostname: string;
	// password?: string;
	// password2?: string;
	// otp?: number;
};

export type ForgotPasswordJson = {
	// success: string;
	otp_quota: number;
	otp_timeout: number;
	otp_used: number;
};

export type ResetPasswordPostJson = {
	account_id: string;
	hostname: string;
	password: string;
	password2: string;
	code: string;
};

export type ResetPasswordJson = {
	success_password_change: string;
};
export type VerifyJson = {
	status: VerfiyStatusJson;
	code: string;
};

export type VerifyPostJson = {
	otp: string;
	account_id: string;
	type: number;
};

export type ResendPostJson = {
	account_id: string;
	// hostname: string;
	type: number;
};
export type SenderJson = {
	otp: {
		otp_timeout: number;
		otp_quota: number;
		otp_used: number;
	};
	status: string;
	active_phone: string;
};
export type CheckSenderJson = boolean;
