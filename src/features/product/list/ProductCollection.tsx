import ProductRepo from "@/services/api/repositories/ProductRepo";
import SiteServerRepo from "@/services/api/repositories/SiteRepo";
import { ComProps } from "@/types/Component";
import { IsShowPromotionPrice, ProductFilter } from "@/types/Product.type";

import { Text } from "@/components/ui";
import Heading from "@/components/ui/Heading";
import LinkElement from "@/components/ui/Link";

import { cn } from "@/utils/utils";

import ProductSlider from "./ProductSlider";

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
		const { store_id } = await new SiteServerRepo().getSiteSeting();
		// console.log("🚀 ~ getListProductServer ~ store_id:", store_id);
		const products = await new ProductRepo({
			accessMode: "PUBLIC",
		}).getAll({ ...fillter, store_id: store_id });
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
				<LinkElement
					href={link}
					className="mb-4 w-full flex justify-between items-center gap-2 max-md:container-padding">
					<Heading level={1} variant="productCollection">
						{title}
					</Heading>

					{more && (
						<Text as="span" variant="link">
							{more.title}
						</Text>
					)}
				</LinkElement>
			)}
			<ProductSlider dataSource={data} />
		</section>
	);
}
