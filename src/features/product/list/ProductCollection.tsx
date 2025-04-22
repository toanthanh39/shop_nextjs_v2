import LinkElement from "@/components/ui/Link";
import Heading from "@/components/ui/Heading";
import ProductSlider from "./ProductSlider";
import { ComProps } from "@/types/Component";
import { cn } from "@/utils/utils";
import { Suspense } from "react";
import Flex from "@/components/ui/Flex";
import { IsShowPromotionPrice, ProductFilter } from "@/types/Product.type";
import { Button } from "@/components/ui";
import ProductRepo from "@/services/api/repositories/ProductRepo";
import { BaseAccessMode } from "@/types/Base.type";
type Props = ComProps & {
	title?: string;
	link?: string;
	more?: {
		title: string;
		link: string;
	};
	params: ProductFilter;
};

async function getListProductServer(fillter: ProductFilter) {
	try {
		const products = await new ProductRepo({
			accessMode: "PUBLIC",
		}).getAll(fillter);
		return products.items;
	} catch (error) {
		return [];
	}
}

export default async function ProductCollection({
	title,
	link,
	more,
	className,
	params,
}: Props) {
	const data = await getListProductServer({
		...params,
		show_promotion_price: IsShowPromotionPrice.show,
	});

	return (
		<section className={cn("relative w-full mb-2 ", className)}>
			{title && link && (
				<LinkElement href={link} className="mb-4">
					<Heading className=" " level={1} variant="productCollection">
						{title}
					</Heading>
				</LinkElement>
			)}
			<ProductSlider dataSource={data} />
			{more && (
				<Button className="mx-auto block mt-2" variant="default">
					{more.title}
				</Button>
			)}
		</section>
	);
}
