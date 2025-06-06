import { notFound } from "next/navigation";

import {
	PerfumeIntructions,
	ProductDetail,
} from "@/features/product/detail";
import ProductRepo from "@/services/api/repositories/ProductRepo";
import { Params } from "@/types/Dynamic.type";

import Flex from "@/components/ui/Flex";


async function getListProductServer(handle: string) {
	try {
		return await new ProductRepo({
			accessMode: "PUBLIC",
		}).getOne(handle);
	} catch (error) {
		notFound();
	}
}

export default async function Page({
	params,
}: Params<{
	handle: string;
}>) {
	const handle = (await params).handle;
	const product = await getListProductServer(handle);

	return (
		<>
			<Flex as="ul" gap={4}>
				<li className="text-colors-gray-4">Home</li>
				<li>|</li>

				<li>{product.full_name}</li>
			</Flex>
			<ProductDetail product={product} />

			<PerfumeIntructions></PerfumeIntructions>
		</>
	);
}
