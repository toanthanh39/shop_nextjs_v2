import { CartItemProps } from "@/types/Cart.type";

import { CustomImage } from "@/components/ui";

import { cn } from "@/utils/utils";

type Props = CartItemProps & {};

export default function CartItemImage({ item, className }: Props) {
	return (
		<CustomImage
			src={item.product_json?.images?.[0]?.url ?? ""}
			width={120}
			height={120}
			alt={item.product_json.name}
			className={cn(className)}
		/>
	);
}
