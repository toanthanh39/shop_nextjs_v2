import ProductModel from "@/common/models/ProductModel";
import { CardBagde } from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import { ProductJson } from "@/types/Product.type";

type Props = {
	product: ProductJson;
};
export default function ProductTags({ product }: Props) {
	const { tags } = product;
	const productInstance = new ProductModel(product);

	const tagValids = tags.filter((i) => i.type === "PRODUCT CARD") ?? [];
	const tagPromotions = productInstance.getPromotionTagLabels();

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
