"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ComProps } from "@/types/Component";
import { ProductJson } from "@/types/Product.type";

import Popup from "@/components/composite/Popup";
import { CartIcon } from "@/components/icons";
import { Button, Flex, Money, Text } from "@/components/ui";
import { ButtonProps } from "@/components/ui/Button";

import useCartGlobal from "@/lib/hooks/cache/useCartGlobal";
import { cn } from "@/utils/utils";


type Props = ComProps &
	ButtonProps & {
		product: ProductJson;
		quantity?: number;
		onFinsh?: () => void;
	};
export default function AddToCart({
	product,
	quantity = 1,
	className,
	onFinsh,
	...props
}: Props) {
	const router = useRouter();
	const { cart, addToCart, isAdding } = useCartGlobal({});

	const [success, setSuccess] = useState(false);
	const add = async () => {
		try {
			await addToCart(
				{
					product_id: product.id,
					item_quantity: quantity,
					product_json: product,
				},
				{
					onSuccess: () => {
						setSuccess(true);
					},
				}
			);
			onFinsh?.();
		} catch (error) {
			console.log("🚀 ~ add ~ error:", error);
		}
	};
	return (
		<>
			<Button
				icon={<CartIcon size="default" />}
				size="default"
				variant="primary"
				{...props}
				loading={isAdding}
				disabled={isAdding}
				className={cn("w-full flex items-center gap-1", className)}
				onClick={add}>
				Thêm giỏ hàng
			</Button>
			<Popup
				open={success}
				onOpenChange={() => setSuccess(false)}
				title="Sản phẩm đã được thêm vào giỏ hàng">
				<Flex direction="col" gap={8} align="center">
					<Text.p className="text-center">
						<Text as="span" weight="bold">
							Free ship
						</Text>{" "}
						Mọi đơn hàng
					</Text.p>

					<Text.p className="text-center">
						<Text as="span" weight="bold">
							Tổng
						</Text>{" "}
						{quantity} sản phẩm <Money value={product.price * quantity}></Money>
					</Text.p>
				</Flex>

				<Flex gap={16} className="mt-4">
					<Button
						onClick={() => router.push("/cart")}
						variant="primary"
						className="w-full flex-1">
						Đến giỏ hàng
					</Button>
					<Button variant="secondary" className="w-full flex-1">
						Tiếp tục mua hàng{" "}
					</Button>
				</Flex>
			</Popup>
		</>
	);
}
