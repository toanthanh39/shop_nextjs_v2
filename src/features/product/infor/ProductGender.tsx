import ProductModel from "@/services/models/ProductModel";
import { ComProps } from "@/types/Component";
import { ProductJson } from "@/types/Product.type";

import { Flex, Tag } from "@/components/ui";

import { cn } from "@/utils/utils";

type Props = ComProps & {
	product: ProductJson;
};
export default function ProductGender({ product, className }: Props) {
	const { tags } = product;

	const genders = tags.filter((t) => t.type === "PRODUCT GENDER");
	if (!genders.length) return null;
	return (
		<Flex className={cn("inline-flex", className)} gap={4}>
			{genders.map((gender) => {
				const variantTag = ProductModel.getCardTagVariant(gender);
				return (
					<Tag key={gender.code} variant={variantTag}>
						{gender.name}
					</Tag>
				);
			})}
		</Flex>
	);
}
