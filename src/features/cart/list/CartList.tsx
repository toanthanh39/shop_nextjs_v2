"use client";

import { Flex, List } from "@/components/ui";
import { CartProps } from "@/types/Cart.type";
import { ComProps } from "@/types/Component";
import { cn } from "@/utils/utils";
import CartItem from "./CartItem";

type Props = ComProps & CartProps & {};
export default function CartList({ cart, className }: Props) {
	return (
		<Flex direction="row" gap={16} className={cn(className)}>
			<List
				className="block gap-4"
				classNameItem="not-first:border-t border-colors-gray-3 "
				dataSource={cart.details.data}
				render={(item, index) => {
					return <CartItem item={item} key={item.id} className="px-1" />;
				}}
			/>
		</Flex>
	);
}
