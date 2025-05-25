import { Flex, Text } from "@/components/ui";
import { CartItemProps } from "@/types/Cart.type";
import { cn } from "@/utils/utils";

type Props = CartItemProps & {};

export default function CartItemName({ item, className }: Props) {
	const { product_json: product } = item;
	return (
		<Flex direction="col" className={cn(className)} gap={2}>
			<Text.p weight="bold">{product.brand.title}</Text.p>
			<Text.p title={product.name} className="line-clamp-2">
				{product.name}
			</Text.p>
			<Text.p title={product.sku} className="line-clamp-2">
				{product.sku}
			</Text.p>
		</Flex>
	);
}
