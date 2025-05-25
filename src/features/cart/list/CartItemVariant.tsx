"use client";
import { CustomImage, Flex, Text } from "@/components/ui";
import useProductList from "@/lib/hooks/cache/useProductList";
import useProductVariantTag from "@/lib/hooks/cache/useProductVariantTag";
import { CartItemProps } from "@/types/Cart.type";
import { ProductJson } from "@/types/Product.type";
import { cn } from "@/utils/utils";
import { useEffect, useMemo, useState } from "react";

type Props = CartItemProps & {
	onChange: (v: ProductJson) => Promise<void>;
};
export default function CartItemVariant({
	item,
	className,
	disabled,
	isLoading,
	onChange,
}: Props) {
	const { data } = useProductVariantTag({ product: item.product_json });
	const [active, setActive] = useState(item.product_id);

	const variantActive = useMemo(() => {
		return data
			?.flatMap((i) => i.items)
			.find((product) => product.id === item.product_id);
	}, [data, item.product_id]);

	///////////////////////////////////////////
	const onChangeVariant = async (v: ProductJson) => {
		if (isLoading || disabled) return;
		try {
			await onChange(v);
			setActive(v.id);
		} catch (error) {
		} finally {
		}
	};

	///////////////////////////////////////////
	useEffect(() => {
		if (item.product_id !== active) {
			setActive(item.product_id);
		}
	}, [item.product_id]);

	///////////////////////////////////////////

	if (!data || !variantActive) {
		return null;
	}
	return (
		<div
			className={cn(
				"w-fit flex-1 relative group rounded bg-colors-gray-2 py-1 px-3",
				className
			)}>
			<Text as="span" className="line-clamp-2 cursor-pointer">
				{variantActive && variantActive.option_name}
			</Text>
			<Flex
				direction="col"
				gap={16}
				className="absolute z-10 w-max h-max top-full right-0 p-2 hidden group-hover:flex bg-white border shadow-lg">
				{data.map((vt) => {
					return (
						<Flex
							key={vt.code}
							direction="col"
							gap={8}
							className="cursor-pointer">
							<Text.p className="mb-0.5">{vt.name}</Text.p>
							{vt.items.map((p) => (
								<Flex
									onClick={() => p.quantity && onChangeVariant(p)}
									key={p.id}
									gap={4}
									justify="start"
									align="center"
									className={cn("p-1 rounded border border-colors-gray-3", {
										"border-colors-red-5": active === p.id,
										"cursor-not-allowed line-through": p.quantity <= 0,
										"opacity-55 ": disabled,
										"cursor-wait": isLoading,
									})}>
									<CustomImage
										src={p.images?.[0]?.url ?? ""}
										alt={p.handle}
										width={28}
										height={28}
									/>
									<Text.p className="line-clamp-1">{p.option_name}</Text.p>
								</Flex>
							))}
						</Flex>
					);
				})}
			</Flex>
		</div>
	);
}
