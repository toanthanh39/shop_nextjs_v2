export enum LoginStatus {
	SUCCESS = "SUCCESS",
	CUSTOMER_ALREADY = "CUSTOMER_ALREADY",
	ACCOUNT_NOT_FOUND = "ACCOUNT_NOT_FOUND",
	ACCOUNT_INACTIVE = "ACCOUNT_INACTIVE",
	PASSWORD_NOT_SET = "PASSWORD_NOT_SET",
	INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
	UNKNOWN_ERROR = "UNKNOWN_ERROR",
}
/////////////////////////////

export type LoginResponse = {
	status: LoginStatus;
	messsage: string;
	redirectUrl?: string;
};
