"use client";
import { Button, Flex, Text } from "@/components/ui";
import { CartItemProps } from "@/types/Cart.type";
import { ComProps } from "@/types/Component";
import { cn } from "@/utils/utils";
import { useEffect, useState } from "react";

type Props = CartItemProps & {
	onQuantityChange: (quantity: number) => void;
};
export default function CartItemQuantity({
	item,
	onQuantityChange,
	className,
	disabled,
	isLoading,
}: Props) {
	const [quantity, setQuantity] = useState<number>(item.item_quantity);

	const handleIncrease = () => {
		setQuantity((prevQuantity) => {
			const newQuantity = prevQuantity + 1;
			onQuantityChange(newQuantity); // Gọi hàm debounce trong CartItem
			return newQuantity;
		});
	};

	const handleDecrease = () => {
		setQuantity((prevQuantity) => {
			const newQuantity = Math.max(prevQuantity - 1, 1); // Đảm bảo không giảm dưới 0
			onQuantityChange(newQuantity); // Gọi hàm debounce trong CartItem
			return newQuantity;
		});
	};

	useEffect(() => {
		if (!disabled && item.item_quantity !== quantity) {
			setQuantity(item.item_quantity);
		}
	}, [item.item_quantity, disabled]);
	return (
		<Flex align="center" gap={16} className={cn(className)}>
			<Flex className="w-full basis-25 shrink-0">
				<Button
					disabled={isLoading || disabled || quantity <= 1}
					size="sm"
					className="w-8"
					onClick={handleDecrease}>
					-
				</Button>
				<Text as="span" className="basis-8 shrink-0 text-center my-auto">
					{quantity}
				</Text>

				<Button
					disabled={
						isLoading || disabled || quantity >= item.product_json.limit_sale
					}
					size="sm"
					className="w-8"
					onClick={handleIncrease}>
					+
				</Button>
			</Flex>
		</Flex>
	);
}
