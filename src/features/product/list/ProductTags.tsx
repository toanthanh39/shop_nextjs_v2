import ProductModel from "@/services/models/ProductModel";
import { ProductJson } from "@/types/Product.type";

import Tag from "@/components/ui/Tag";

type Props = {
	product: ProductJson;
};
export default function ProductTags({ product }: Props) {
	const { tags } = product;

	const tagValids =
		tags.filter((i) => i.type === "PRODUCT CARD" && i.value?.length > 0) ?? [];
	const tagPromotions = ProductModel.getPromotionTagLabels(product).filter(
		(t) => t.name_card?.length > 0
	);

	return (
		<>
			{tagPromotions?.map((tag, index) => {
				return (
					<Tag key={index} variant={"primary"} size="xs">
						{tag.name_card}
					</Tag>
				);
			})}
			{tagValids?.map((tag, index) => {
				const variant = ProductModel.getCardTagVariant(tag);

				return (
					<Tag key={index} variant={variant} size="xs">
						{tag.value}
					</Tag>
				);
			})}
		</>
	);
}
