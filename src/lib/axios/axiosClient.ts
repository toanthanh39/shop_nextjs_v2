// eslint-disable-next-line import/named
import { onSignOutAction } from "@/actions/auth-actions";
import axios, { AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
import { getSession, signOut } from "next-auth/react";
// import { signOut } from "../next-authen/authenOption";

function checkUrlForPublicAndLogin(url: string) {
	// Đảm bảo URL là một chuỗi hợp lệ
	if (typeof url !== "string") {
		return false;
	}

	// Chuyển URL về chữ thường để đảm bảo việc tìm kiếm không phân biệt chữ hoa/thường
	const lowerCaseUrl = url.toLowerCase();

	// Kiểm tra xem URL có chứa cả hai chuỗi "public" và "login" hay không
	const hasPublic = lowerCaseUrl.includes("public");
	const hasLogin = lowerCaseUrl.includes("login");

	// Trả về true nếu cả hai điều kiện đều đúng
	return hasPublic || hasLogin;
}
///////////////////////////////////////////////////
const source = axios.CancelToken.source();
let sessionCache: any = null;

const AxiosInstance = axios.create({
	timeout: 1000 * 60,
	headers: {
		"Content-Type": "application/json",
	},
	"axios-retry": {
		retries: 3, // Number of retry attempts
	},
	cancelToken: source.token,
});

axiosRetry(AxiosInstance, {
	retries: AxiosInstance.defaults["axios-retry"]?.retries || 3,

	retryCondition: (error) => {
		const status = error?.response?.status || 500;
		const dataError = error.response?.data;

		if (status === 401) return false;

		if (status === 400 && dataError) {
			const err = { ...dataError } as any;
			if (err?.error?.includes("error_jwt_blacklisted")) return false;
		}

		return status >= 500 || (status >= 300 && status < 400);
	},
	retryDelay: (retryCount) => retryCount * 1000, // Delay between retries (1s)

	shouldResetTimeout: true,
	onRetry: (retryCount, error, requestConfig) => {
		// Custom logic on retry
	},
});

AxiosInstance.interceptors.request.use(async (request) => {
	const requestUrl = request.url || "";

	if (!checkUrlForPublicAndLogin(requestUrl)) {
		let token = "";
		if (!sessionCache) {
			const session = await getSession();
			sessionCache = session;
		}
		/*set token  */
		token = sessionCache?.user?.jwt ?? "";

		if (token.length) {
			request.headers.Authorization = `${token}`;
		}
	}

	if (request.method === "get") {
		request.params = {
			...request.params,
		};
	}

	return request;
});
let isSignOutCalled = false;

AxiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error) => {
		if (error.response) {
			if (error.response.status >= 500) {
				throw new Error("Server Error");
			}
			const isTokenExpired = error.response.status === 401;
			const isTokenBacklist =
				error.response.status === 400 &&
				error.response?.data?.error?.includes("error_jwt_blacklisted");

			if (isTokenExpired || isTokenBacklist) {
				if (!isSignOutCalled) {
					isSignOutCalled = true;
					sessionCache = null;
					const currentUrl = window.location.pathname;
					await signOut();

					// await signOut();
					// if (window.location.pathname.includes("/pos")) {
					// 	window.location.href = "/pos";
					// } else {
					// }
				}
			}
		}

		return Promise.reject(error);
	}
);

export default AxiosInstance;
