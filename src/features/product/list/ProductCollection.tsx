import LinkElement from "@/components/ui/Link";
import Heading from "@/components/ui/Heading";
import ProductSlider from "./ProductSlider";
import { ComProps } from "@/types/Component";
import { cn } from "@/utils/utils";
import { IsShowPromotionPrice, ProductFilter } from "@/types/Product.type";
import { Button } from "@/components/ui";
import ProductRepo from "@/services/api/repositories/ProductRepo";
import SiteServerRepo from "@/services/api/repositories/SiteRepo";
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
		const products = await new ProductRepo({
			accessMode: "PUBLIC",
		}).getAll({ ...fillter, store_id: store_id });
		return products.items;
	} catch (error) {
		console.log("🚀 ~ getListProductServer ~ error:", error);

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
					<Heading level={1} variant="productCollection">
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
