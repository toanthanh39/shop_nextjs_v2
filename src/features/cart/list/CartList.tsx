"use client";

import { Flex } from "@/components/ui";
import { CartProps } from "@/types/Cart.type";
import { ComProps } from "@/types/Component";
import { cn } from "@/utils/utils";
import CartItem from "./CartItem";

type Props = ComProps & CartProps & {};
export default function CartList({ cart, className }: Props) {
	return (
		<Flex direction="row" gap={16} className={cn(className)}>
			<Flex direction="col" gap={16}>
				{cart.details.data.map((item) => {
					return <CartItem item={item} key={item.id} className="px-1" />;
				})}
			</Flex>
		</Flex>
	);
}
