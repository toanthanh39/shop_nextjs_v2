import Main from "@/components/layouts/main";
import Flex from "@/components/ui/Flex";
import { ProductAction } from "@/features/product/detail";
import ProductRepo from "@/services/api/repositories/ProductRepo";
import { BaseAccessMode } from "@/types/Base.type";
import { Params } from "@/types/Dynamic.type";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getListProductServer(handle: string) {
	try {
		return await new ProductRepo({
			accessMode: BaseAccessMode.PUBLIC_SERVER,
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
	const products = await getListProductServer(handle);

	return (
		<Main className="p-4">
			<h1 className="text-2xl font-bold mb-4">Products</h1>
			<Link href={"/"} prefetch={true}>
				Home
			</Link>

			<Flex>
				<ProductAction></ProductAction>
			</Flex>
		</Main>
	);
}
