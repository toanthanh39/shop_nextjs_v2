import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import ServerRepo from "@/services/api/repositories/ServerRepo";
import SettingRepo from "@/services/api/repositories/SettingRepo";
import { SystemSetting } from "@/types/Shop.type";

import Validate from "@/utils/validate";

export const initSiteSetting = async (
	request: NextRequest,
	response: NextResponse
) => {
	const _header = request.headers;
	const _cookies = cookies();

	try {
		const domain = _header.get("x-forwarded-host")!;
		const replaceDomainSetting = Validate.validateKey(domain);
		const key = `${replaceDomainSetting}_config`;

		const dataSetting = await new SettingRepo().getOne<SystemSetting>(key);
		console.log("🚀 ~ dataSetting:", dataSetting);
		const customer_token =
			_header.get("customer_token") ??
			(await ServerRepo.getCustomerTokenServer());

		(await _cookies).set("customer_token", customer_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 30 * 3,
			expires: new Date().getMonth() + 3,
			path: "/",
			// domain: process.env.NEXT_PUBLIC_BASE_URL,
		});

		response.headers.append("customer_token", customer_token);
		response.headers.append("lang", dataSetting.value.lang);
		response.headers.append("store_id", dataSetting.value.store_id.toString());

		response.headers.append(
			"pagination_limit",
			dataSetting.value.pagination_limit
		);

		response.headers.append(
			"id_ecomplatforms_for_web",
			dataSetting.value.id_ecomplatforms_for_web.toString()
		);

		return response;
	} catch (error) {
		console.log("🚀 ~ error:", error);
		throw error;
		// redirect về page lỗi
		// return NextResponse.redirect(
		// 	new URL(SystemConst.ROUTE_ERROR_REDIRECT, request.url)
		// );
	}
};
