import AxiosInstance from "@/lib/axios/axiosClient";
import { AxiosRequestConfig, Method } from "axios";

interface Options {
	url: string;
	method: Lowercase<Method>;
	axiosConfig?: AxiosConfig;
}

interface Data extends Object {}

export type AxiosConfig = Omit<AxiosRequestConfig, "method" | "url">;

const mergeConfig = (axiosConfig?: AxiosRequestConfig): AxiosRequestConfig => {
	return {
		...axiosConfig,
		headers: {
			"Cache-Control": "no-cache",
			...axiosConfig?.headers,
		},
	};
};

const processUrl = (url: string) => {
	return url.includes("https") || url.includes("http")
		? url
		: process.env.NEXT_PUBLIC_API_BASE_URL + url;
};

async function client<T>(options: Options) {
	const { axiosConfig, url, method } = options;

	const axiosOptionsInstance: AxiosRequestConfig = {
		url: processUrl(url),
		...mergeConfig(axiosConfig),
		method: method,
	};
	const response = await AxiosInstance<T>(axiosOptionsInstance);
	return response.data;
}

// Gán các phương thức HTTP của Axios cho client
client.get = <T>(url: string, config?: AxiosConfig) => {
	return client<T>({ axiosConfig: config, method: "get", url });
};

client.post = <T>(
	url: string,
	data?: Data,
	config?: Omit<AxiosConfig, "data">
) => {
	return client<T>({
		axiosConfig: { ...config, data: data },
		method: "post",
		url,
	});
};

client.put = <T>(
	url: string,
	data?: Data,
	config?: Omit<AxiosConfig, "data">
) => {
	return client<T>({
		axiosConfig: { ...config, data: data },
		method: "put",
		url,
	});
};

client.delete = <T>(url: string, config?: AxiosConfig) => {
	return client<T>({ axiosConfig: config, method: "delete", url });
};
export default client;
