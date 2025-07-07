// utils/loyaltyAuthHandler.ts

import { LoginJson, LoginPostJson } from "@/types/Auth.type";
import AuthRepo from "../api/repositories/AuthRepo";
import { LoginResponse, LoginStatus } from "@/types/Loyalty.type";
import BaseApi, { ErrorResponse } from "@/lib/axios/BaseApi";

export class LoyaltyAuthHandler {
	private static readonly API_ENDPOINTS = {
		LOGIN: "/api/loyalty/login",
		ACTIVATE: "/api/loyalty/activate",
		SET_PASSWORD: "/api/loyalty/set-password",
		REGISTER: "/api/loyalty/register",
	};

	/**
	 * Xử lý đăng nhập và phân loại response theo các cases
	 * @param credentials Input api Login
	 * @returns Ouput api login
	 */
	static async handleLogin(credentials: LoginPostJson): Promise<LoginResponse> {
		try {
			const res = await new AuthRepo().login(credentials);

			return this.processLoginResponse(res);
		} catch (error) {
			const dataError = BaseApi.handleError(error);

			return this.processLoginError(dataError);
		}
	}

	/**
	 * Phân tích response từ API và trả về LoginResponse phù hợp
	 * @param LoginJson Output từ api login
	 * @returns custom object sau khi phân tích
	 */
	private static processLoginResponse(apiResponse: LoginJson): LoginResponse {
		// Case 1: Đăng nhập thành công
		if (apiResponse.status === "SUCCESS") {
			return {
				status: LoginStatus.SUCCESS,
				message: "Đăng nhập thành công",
				user: apiResponse,
				token: apiResponse.jwt,
				redirectUrl: "/loyalty/dashboard",
			};
		}

		// Xử lý các cases lỗi dựa trên error code
		const errorCode = apiResponse.error?.code;
		const errorMessage = apiResponse.error?.message || "Có lỗi xảy ra";

		switch (apiResponse.status) {
			// Case 2: Tài khoản không tồn tại
			case "ACCOUNT_NOT_FOUND":
			case "USER_NOT_EXISTS":
				return {
					status: LoginStatus.ACCOUNT_NOT_FOUND,
					message: "Tài khoản không tồn tại. Vui lòng đăng ký tài khoản mới.",
					redirectUrl: "/loyalty/register",
				};

			// Case 3: Tài khoản chưa được kích hoạt
			case "ACCOUNT_INACTIVE":
			case "USER_NOT_ACTIVATED":
				return {
					status: LoginStatus.ACCOUNT_INACTIVE,
					message:
						"Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt.",
					redirectUrl: "/loyalty/activate",
				};

			// Case 4: Tài khoản chưa thiết lập mật khẩu
			case "PASSWORD_NOT_SET":
			case "USER_NO_PASSWORD":
				return {
					status: LoginStatus.PASSWORD_NOT_SET,
					message: "Tài khoản chưa thiết lập mật khẩu. Vui lòng tạo mật khẩu.",
					redirectUrl: "/loyalty/set-password",
				};

			// Case khác: Sai thông tin đăng nhập
			case "INVALID_CREDENTIALS":
			case "WRONG_PASSWORD":
				return {
					status: LoginStatus.INVALID_CREDENTIALS,
					message: "Email hoặc mật khẩu không chính xác.",
				};

			// Default case
			default:
				return {
					status: LoginStatus.UNKNOWN_ERROR,
					message: errorMessage,
				};
		}
	}

	private static processLoginError(error: ErrorResponse) {
		const { errors, active_phone, statusCode } = error;
		const errorTax = errors?.[0] ?? "";

		switch (errorTax) {
			// Case 2: Tài khoản không tồn tại
			case "ACCOUNT_NOT_FOUND":
			case "USER_NOT_EXISTS":
				return {
					status: LoginStatus.ACCOUNT_NOT_FOUND,
					message: "Tài khoản không tồn tại. Vui lòng đăng ký tài khoản mới.",
					redirectUrl: "/loyalty/register",
				};

			// Case 3: Tài khoản chưa được kích hoạt
			case "ACCOUNT_INACTIVE":
			case "USER_NOT_ACTIVATED":
			case "ERROR_CUSTOMER_UNACTIVATED":
				return {
					status: LoginStatus.ACCOUNT_INACTIVE,
					message:
						"Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt.",
					redirectUrl: "/loyalty/activate",
				};

			// Case 4: Tài khoản chưa thiết lập mật khẩu
			case "PASSWORD_NOT_SET":
			case "USER_NO_PASSWORD":
				return {
					status: LoginStatus.PASSWORD_NOT_SET,
					message: "Tài khoản chưa thiết lập mật khẩu. Vui lòng tạo mật khẩu.",
					redirectUrl: "/loyalty/set-password",
				};

			// Case khác: Sai thông tin đăng nhập
			case "INVALID_CREDENTIALS":
			case "WRONG_PASSWORD":
				return {
					status: LoginStatus.INVALID_CREDENTIALS,
					message: "Email hoặc mật khẩu không chính xác.",
				};

			// Default case
			default:
				return {
					status: LoginStatus.UNKNOWN_ERROR,
					message: errorMessage,
				};
		}
	}

	/**
	 * Xử lý hành động sau khi đăng nhập dựa trên status
	 * @param loginResponse
	 */
	static handlePostLogin(loginResponse: LoginResponse): void {
		switch (loginResponse.status) {
			case LoginStatus.SUCCESS:
				this.handleSuccessfulLogin(loginResponse);
				break;

			case LoginStatus.ACCOUNT_NOT_FOUND:
				this.redirectToRegister();
				break;

			case LoginStatus.ACCOUNT_INACTIVE:
				this.redirectToActivation(loginResponse);
				break;

			case LoginStatus.PASSWORD_NOT_SET:
				this.redirectToPasswordSetup(loginResponse);
				break;

			case LoginStatus.INVALID_CREDENTIALS:
				this.showError(loginResponse.message);
				break;

			default:
				this.showError(loginResponse.message);
		}
	}

	// Các helper methods cho việc xử lý từng case
	private static handleSuccessfulLogin(response: LoginResponse): void {}

	private static redirectToRegister(): void {
		window.location.href = "/loyalty/register";
	}

	private static redirectToActivation(response: LoginResponse): void {
		// Có thể lưu email để pre-fill form activation
		const email = new URLSearchParams(window.location.search).get("email");
		const redirectUrl = email
			? `/loyalty/activate?email=${encodeURIComponent(email)}`
			: "/loyalty/activate";

		window.location.href = redirectUrl;
	}

	private static redirectToPasswordSetup(response: LoginResponse): void {
		// Tương tự như activation, có thể pre-fill email
		const email = new URLSearchParams(window.location.search).get("email");
		const redirectUrl = email
			? `/loyalty/set-password?email=${encodeURIComponent(email)}`
			: "/loyalty/set-password";

		window.location.href = redirectUrl;
	}

	private static showError(message: string): void {
		// Hiển thị error message - có thể dùng toast, modal, hoặc state management
		console.error("Login error:", message);
		// Example: toast.error(message);
	}

	/**
	 * Utility method để check user đã đăng nhập chưa
	 */
	static isLoggedIn(): boolean {
		const token = localStorage.getItem("loyalty_token");
		return !!token;
	}

	/**
	 * Utility method để lấy thông tin user hiện tại
	 */
	static getCurrentUser(): any | null {
		const userStr = localStorage.getItem("loyalty_user");
		return userStr ? JSON.parse(userStr) : null;
	}

	/**
	 * Logout và clear data
	 */
	static logout(): void {
		localStorage.removeItem("loyalty_token");
		localStorage.removeItem("loyalty_user");
		window.location.href = "/loyalty/login";
	}
}
