"use client";
import { Button, Flex, Money, Text } from "@/components/ui";
import { useCancelToken } from "@/lib/hooks/optimization/useCancelToken";
import CartRepo from "@/services/api/repositories/CartRepo";
import CartCalculator from "@/services/utils/CartCalculator";
import { BaseAccessMode } from "@/types/Base.type";
import { CartProps } from "@/types/Cart.type";
import { ComProps } from "@/types/Component";
import { cn } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = ComProps &
	CartProps & {
		onSubmit?: () => void;
	};
export default function CartInfor({
	className,
	cart,
	isLoading,
	onSubmit,
}: Props) {
	const priceInfor = CartCalculator.getPriceInfor(cart);

	const { newCancelToken, setCancel } = useCancelToken();

	/////////////////////////////////////////////////////////
	const [isPrefeching, setIsPrefetching] = useState(false);

	const router = useRouter();
	const handleCheckout = onSubmit
		? onSubmit
		: () => {
				setIsPrefetching(true);
				router.push(`/checkouts/${cart.id}`);
		  };

	useEffect(() => {
		if (!onSubmit) router.prefetch(`/checkouts/${cart.id}`);
	}, [cart.id]);

	return (
		<Flex direction="col" gap={8} className={cn("", className)}>
			<Flex justify="between" gap={4}>
				<Text.p variant="default">Tổng tiền hàng</Text.p>
				<Text.p>
					<Money variant="default" value={priceInfor.totalProductPrice}></Money>
				</Text.p>
			</Flex>
			<Flex justify="between" gap={4}>
				<Text.p variant="default">Giảm giá sản phẩm</Text.p>
				<Text.p>
					<Money
						variant="default"
						minus="-"
						value={priceInfor.productDiscount}></Money>
				</Text.p>
			</Flex>

			<Flex justify="between" gap={4}>
				<Text.p variant="default">Giảm giá Khuyến mãi</Text.p>
				<Text.p>
					<Money
						variant="default"
						minus="-"
						value={priceInfor.promotionDiscount}></Money>
				</Text.p>
			</Flex>

			<Flex justify="between" gap={4}>
				<Text.p variant="default">Phí vận chuyển</Text.p>
				<Text.p>
					<Money variant="default" value={priceInfor.shippingFee}></Money>
				</Text.p>
			</Flex>

			<hr className="h-0 border-2 border-colors-gray-2 w-full" />
			<Flex justify="between" gap={4}>
				<Text.p variant="primary">Tiết kiệm</Text.p>
				<Text.p>
					<Money variant="primary" value={priceInfor.priceSave}></Money>
				</Text.p>
			</Flex>

			<Flex justify="between" gap={4}>
				<Text.p>Tổng thanh toán:</Text.p>
				<Text.p>
					<Money value={cart.total_payment}></Money>
				</Text.p>
			</Flex>
			<Button
				loading={isLoading || isPrefeching}
				disabled={isLoading}
				type="button"
				onClick={handleCheckout}
				variant="primary"
				className="block w-full">
				Thanh toán
			</Button>
		</Flex>
	);
}
