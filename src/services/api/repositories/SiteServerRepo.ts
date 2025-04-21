"use server";
import server from "@/lib/core/server";
import { cookies, headers } from "next/headers";

class SiteServerRepo {
	private readonly URLs = {
		CUSTOMER: {
			PRIVATE: "/customers",
			PUBLIC: "/customers/public",
		},
	};

	async getCustomerTokenServer() {
		const _cookies = await cookies();
		const _headers = await headers();

		const _userAgent = _headers.get("user-agent");
		const _tokenCached =
			_headers.get("customer_token") ?? _cookies.get("customer_token")?.value;

		if (_tokenCached) {
			return _tokenCached;
		}

		const res = server.get<string>(this.URLs.CUSTOMER.PUBLIC + "/browser", {
			cache: "force-cache",
			headers: {
				"X-User-Agent": _userAgent ?? "",
			},
		});
		return res;
	}
}

export default SiteServerRepo;
