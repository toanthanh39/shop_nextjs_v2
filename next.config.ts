import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: false,
	pageExtensions: ["ts", "tsx"],
	env: {
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
		NEXT_PUBLIC_API_BASE_URL_V2: process.env.NEXT_PUBLIC_API_BASE_URL_V2,
		NEXT_PUBLIC_API_BASE_DOMAIN: process.env.NEXT_PUBLIC_API_BASE_DOMAIN,
		NEXT_PUBLIC_API_BASE_SETTING_CONFIG:
			process.env.NEXT_PUBLIC_API_BASE_SETTING_CONFIG,

		NEXT_PUBLIC_API_BASE_URL_HOST: process.env.NEXT_PUBLIC_API_BASE_URL_HOST,
		NEXT_PUBLIC_API_ASSET_URL: process.env.NEXT_PUBLIC_API_ASSET_URL,
		NEXT_PUBLIC_API_IMAGINARY_BASE_URL:
			process.env.NEXT_PUBLIC_API_IMAGINARY_BASE_URL,
		NEXT_PUBLIC_API_PUSHER_CLUSTER: process.env.NEXT_PUBLIC_API_PUSHER_CLUSTER,
		NEXT_PUBLIC_API_IS_DEBUG: process.env.NEXT_PUBLIC_API_IS_DEBUG,
		NEXT_PUBLIC_API_DOMAIN: process.env.NEXT_PUBLIC_API_DOMAIN,
		NEXT_PUBLIC_API_HOST_ADMIN: process.env.NEXT_PUBLIC_API_HOST_ADMIN,

		REACT_APP_BASE_URL_V2: process.env.REACT_APP_BASE_URL_V2,
	},

	compiler: {
		removeConsole: process.env.NODE_ENV === "production" ? true : false,
	},

	experimental: {
		staleTimes: {
			dynamic: 60,
			static: 180,
		},
	},

	devIndicators: {
		appIsrStatus: false,
		buildActivityPosition: "bottom-left",
	},
	httpAgentOptions: {
		keepAlive: false,
	},

	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ldevthumbnail.namefragrance.vn",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "ldevasset.namefragrance.vn",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "uatasset.namefragrance.vn",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "uatthumbnail.namefragrance.vn",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "asset.namefragrance.vn",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "api.namefragrance.vn",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "theme.hstatic.net",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "beta.namperfume.net",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "thumbnail.namefragrance.vn",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "i.ytimg.com",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "i.ytimg.com/vi",
				port: "",
				pathname: "**",
			},
		],
	},
	productionBrowserSourceMaps: false,
};

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");
export default withNextIntl(nextConfig);
