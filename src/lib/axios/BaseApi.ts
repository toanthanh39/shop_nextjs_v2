import { ErrorDetail, ErrorServer } from "@/types/Error.type";
import { AxiosError, isAxiosError } from "axios";

interface ErrorResponse {
	statusCode: number;
	errors: string[];
	error_detail?: ErrorDetail[];
	active_phone: string;
	time: number;
	url: string;
}

class BaseApi {
	debug: boolean;

	constructor(debug: boolean) {
		this.debug = debug;
	}

	static handleError(axiosError: unknown): ErrorResponse {
		let { statusCode, errors, error_detail, active_phone, time, url } =
			this.initializeErrorFields();

		if (isAxiosError(axiosError)) {
			return this.extractAxiosErrorDetails(axiosError);
		}

		if (this.isCustomError(axiosError)) {
			return this.extractCustomErrorDetails(axiosError);
		}

		if (this.isErrorFetchServer(axiosError)) {
			return this.extractErrorFetchServer(axiosError);
		}

		if (axiosError instanceof Error) {
			/* - lỗi network
        lỗi  timeout request */
			errors.push(axiosError.message);
			statusCode = -1;
		} else if (this.isErrorObject(axiosError)) {
			errors = axiosError.errors;
		} else {
			errors.push(JSON.stringify(axiosError));
		}

		return { statusCode, errors, error_detail, active_phone, time, url };
	}

	private static initializeErrorFields(): ErrorResponse {
		return {
			statusCode: 0,
			errors: [] as string[],
			error_detail: [] as ErrorDetail[],
			active_phone: "",
			time: 0,
			url: "",
		};
	}

	private static extractAxiosErrorDetails(
		axiosError: AxiosError
	): ErrorResponse {
		const url = axiosError.response?.config?.url || "";
		let statusCode = axiosError.response?.status || 500;
		let errors: string[] = [];
		let error_detail: ErrorDetail[] = [];
		let active_phone = "";
		let time = 0;

		if (axiosError?.response?.data) {
			const data = axiosError.response.data as any;
			if (data && "error" in data) {
				// Ensure 'errors' is always an array
				errors =
					typeof data.error === "string" ? [data.error] : data.error || [];

				// Ensure 'error_detail' is always an array of ErrorDetail
				error_detail = Array.isArray(data.error_detail)
					? data.error_detail
					: [];

				// Confirm 'active_phone' is a string
				active_phone =
					typeof data.active_phone === "string" ? data.active_phone : "";

				// Validate 'time' is a number, fallback to 0
				time = typeof data.time === "number" ? data.time : 0;
			}
		} else {
			errors.push("api_not_response");
			error_detail.push({ response: JSON.stringify(axiosError) });
		}

		return { statusCode, errors, error_detail, active_phone, time, url };
	}

	private static extractCustomErrorDetails(error: ErrorServer): ErrorResponse {
		const { errors, status: statusCode, error_detail } = error;

		return {
			statusCode,
			errors,
			error_detail,
			active_phone: "",
			time: 0,
			url: "",
		};
	}

	private static isCustomError(obj: any): obj is ErrorServer {
		return obj && typeof obj === "object" && Array.isArray(obj.errors);
	}

	private static isErrorObject(
		obj: any
	): obj is { errors: string[]; statusCode?: number } {
		return obj && typeof obj === "object" && Array.isArray(obj.errors);
	}

	private static isErrorFetchServer(axiosError: unknown) {
		const err = axiosError as any;
		return (
			err?.hasOwnProperty("isAxiosError") &&
			err.isAxiosError === false &&
			err?.response
		);
	}

	private static extractErrorFetchServer(axiosError: unknown): ErrorResponse {
		const err = axiosError as any;
		return {
			...this.initializeErrorFields(),
			errors: err.response.error,
			statusCode: err.status,
		};
	}
}

export default BaseApi;
