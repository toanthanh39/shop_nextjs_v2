import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { SystemConst } from "@/common/constants/system";
export async function GET() {
	const result = SystemConst.DEFAULT_SYSTEM_SETTING;
	try {
		// return NextResponse.json(result, { status: 200 });

		// Lấy headers
		const headersMap = await headers();

		// Chạy song song các tác vụ lấy header 'lang' và 'store_id'
		const [lang, store_id, pagination_limit, customer_token] =
			await Promise.all([
				headersMap.get("lang"),
				headersMap.get("store_id"),
				headersMap.get("pagination_limit"),
				headersMap.get("customer_token"),
				headersMap.get("id_ecomplatforms_for_web"),
			]);
		console.log("🚀 ~ GET ~ store_id:", store_id);

		if (!customer_token || customer_token === "") {
			return NextResponse.json(
				{ message: "error_customer_token_notfound" },
				{ status: 406 }
			);
		}

		// Gán kết quả vào đối tượng result sau khi song song hoàn tất
		if (lang) {
			result.lang = lang;
		}
		if (store_id) {
			result.store_id = parseInt(store_id, 10);
		}

		if (pagination_limit) {
			result.pagination_limit = parseInt(pagination_limit, 10);
		}

		if (customer_token) {
			result.customer_token = customer_token;
		}

		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		// return NextResponse.json(result, { status: 200 });

		return NextResponse.json({ message: "Error", error }, { status: 500 });
	}
}
