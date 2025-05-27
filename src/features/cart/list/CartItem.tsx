"use client";
import { Button, CustomImage, Flex, Grid, Text } from "@/components/ui";
import CartItemPrice from "./CartItemPrice";
import useCartGlobal from "@/lib/hooks/cache/useCartGlobal";

import { CartItemProps } from "@/types/Cart.type";
import { ComProps } from "@/types/Component";
import { cn, debounce } from "@/utils/utils";
import CartItemQuantity from "./CartItemQuantity";
import CartItemImage from "./CartItemImage";
import CartItemName from "./CartItemName";
import CartItemAction from "./CartItemAction";
import ProgressBar from "@/components/ui/ProgressBar";
import CartItemVariant from "./CartItemVariant";
import CartItemIsUse from "./CartItemIsUse";
import { IsUse } from "@/types/Global.type";
import { useMemo } from "react";
import { ProductJson } from "@/types/Product.type";
import { OrderId } from "@/types/Order.type";

type Props = ComProps & CartItemProps & {};
export default function CartItem({ item, className }: Props) {
	const { updateCart, isUpdating } = useCartGlobal({
		enabled: false,
	});

	const onUpdateQuantity = async (quantity: number) => {
		try {
			await updateCart({
				action: "quantity",
				data: {
					id: item.id,
					item_quantity: quantity,
					product_id: item.product_id,
				},
			});
			return true;
		} catch (error) {
			console.log("🚀 ~ error:", error);
			return false;
		}
	};

	const onDeleteItem = async (id: OrderId) => {
		try {
			await updateCart({
				action: "remove",
				data: { ids: [id] },
			});
			return true;
		} catch (error) {
			return false;
		}
	};

	const updateVariant = async (variant: ProductJson) => {
		try {
			await updateCart({
				action: "variant",
				data: {
					product_json: variant,
					id: item.id,
					produt_variant_json: variant,
					product_id: variant.id,
				},
			});
		} catch (error) {}
	};

	const updateIsUse = async (use: boolean) => {
		try {
			await updateCart({
				action: "use",
				data: [
					{
						id: item.id,
						is_use: use ? IsUse.USE : IsUse.NOT_USE,
						product_id: item.product_id,
					},
				],
			});
		} catch (error) {
			console.log("🚀 ~ updateIsUse ~ error:", error);
		}
	};
	//////////////////////////////////////////////////
	const disabled = useMemo(() => {
		return item.product_json.quantity <= 0;
	}, [item.product_json.quantity]);

	const hasPromo = useMemo(() => {
		return item.product_json.promotions.length > 0;
	}, [item.product_json.promotions.length]);
	return (
		<Flex
			key={item.id}
			direction="row"
			gap={16}
			className={cn("relative py-4 ", className)}>
			{disabled && (
				<Text variant="default" className="absolute -bottom-1 left-2 z-2">
					Hết hàng
				</Text>
			)}
			<ProgressBar isLoading={isUpdating}></ProgressBar>
			<CartItemIsUse onChange={updateIsUse} item={item}></CartItemIsUse>
			<CartItemImage item={item} />
			<Flex gap={32} className="relative w-full max-md:flex-col max-md:gap-2">
				<Flex
					gap={32}
					justify="between"
					className="basis-1/2 max-md:flex-col max-md:gap-2">
					<CartItemName item={item} className="max-w-[190px]" />
					<Flex
						direction="col"
						className="flex-auto w-fit md:shrink-0 md:basis-20 ">
						<CartItemPrice item={item} />
						{hasPromo && <Text className="mt-2">🎁</Text>}
					</Flex>
				</Flex>
				<Flex gap={32} className="basis-1/2 max-md:flex-col max-md:gap-2">
					<CartItemQuantity
						disabled={disabled}
						isLoading={isUpdating}
						item={item}
						onQuantityChange={onUpdateQuantity}
						className="flex-1 w-fit"
					/>
					<CartItemVariant
						item={item}
						onChange={updateVariant}
						disabled={disabled}
						isLoading={isUpdating}
						className=" w-fit"
					/>
				</Flex>
				<CartItemAction
					item={item}
					onDeleteItem={onDeleteItem}
					isLoading={isUpdating}
					className="w-fit "
				/>
			</Flex>
		</Flex>
	);
}
