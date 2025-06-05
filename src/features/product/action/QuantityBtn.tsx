"use client";

import { Flex, Label } from "@/components/ui";
import { ComProps } from "@/types/Component";
import { ProductJson } from "@/types/Product.type";
import { cn } from "@/utils/utils";

type Props = ComProps & {
	product: ProductJson;
	quantity: number;
	onInCrease?: () => void;
	onDeCrease?: () => void;
	onChangeQuantity?: (q: number) => void;
};
export default function QuantityBtn(props: Props) {
	const {
		product,
		quantity,
		className,
		disabled,
		isLoading,
		onDeCrease,
		onInCrease,
		onChangeQuantity,
	} = props;

	////////////////////////////////////////
	const handleIncrease = () => {
		onInCrease?.();
	};
	const handleDecrease = () => {
		onDeCrease?.();
	};

	const handleOnChange = (val: number) => {
		onChangeQuantity?.(val);
	};
	return (
		<Flex className={cn(className)}>
			<Label htmlFor="quantity" className="whitespace-nowrap">
				Số lượng:
			</Label>
			<Flex align="center" className="border rounded-md w-fit">
				<button
					disabled={disabled || isLoading}
					onClick={handleDecrease}
					className={cn(
						"px-3 py-1 text-gray-600 hover:text-gray-800 cursor-pointer",
						{
							"cursor-not-allowed": disabled,
							"cursor-wait": isLoading,
						}
					)}>
					-
				</button>
				<input
					disabled={disabled || isLoading}
					type="number"
					id="quantity"
					value={quantity}
					onChange={(e) =>
						handleOnChange(Math.max(1, parseInt(e.target.value) || 1))
					}
					className="w-12 text-center border-none focus:outline-none"
					min="1"
				/>
				<button
					disabled={disabled || isLoading}
					onClick={handleIncrease}
					className={cn(
						"px-3 py-1 text-gray-600 hover:text-gray-800 cursor-pointer",
						{
							"cursor-not-allowed": disabled,
							"cursor-wait": isLoading,
						}
					)}>
					+
				</button>
			</Flex>
		</Flex>
	);
}
