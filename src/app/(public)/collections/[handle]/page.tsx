import { ProductCard } from "@/features/product/list";
import ProductRepo from "@/services/api/repositories/ProductRepo";
import { Params } from "@/types/Dynamic.type";
import PageClient from "./page.client";
import { Suspense } from "react";
import SiteServerRepo from "@/services/api/repositories/SiteRepo";

async function getDataServer(collection_handle: string) {
	try {
		const site = await new SiteServerRepo().getSiteSeting();
		const resProducts = await new ProductRepo({ accessMode: "PUBLIC" }).getAll({
			show: "web",
			limit: site.pagination_limit,
			collection_handle: collection_handle,
			page: 1,
			store_id: site.store_id,
		});

		return resProducts.items;
	} catch (error) {
		console.log("🚀 ~ getDataServer ~ error:", error);
		return [];
	}
}

export default async function Page({ params }: Params<{ handle: string }>) {
	const handle = (await params).handle;

	const products = await getDataServer(handle);

	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<PageClient dataSource={products}></PageClient>
			</Suspense>
		</div>
	);
}
