"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import OrderModel from "@/common/models/OrderModel";
import { CartProps } from "@/types/Cart.type";
import { ComProps } from "@/types/Component";

import { Button, Flex, List, Money, Text } from "@/components/ui";

import { useCancelToken } from "@/lib/hooks/optimization/useCancelToken";
import CartCalculator from "@/services/utils/CartCalculator";
import { cn } from "@/utils/utils";


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

			<Flex vertical>
				<Flex justify="between" gap={4}>
					<Text.p variant="default">Giảm giá Khuyến mãi</Text.p>
					<Text.p>
						<Money
							variant="default"
							minus="-"
							value={priceInfor.promotionDiscount}></Money>
					</Text.p>
				</Flex>
				<CartInfor.CouponList cart={cart}></CartInfor.CouponList>
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

CartInfor.CouponList = ({ cart }: Props) => {
	const t = useTranslations("cart.cart_infor");
	const OrderModelInstance = new OrderModel(cart);
	const allOrderPromotionCoupon = OrderModelInstance.getPromotionCouponUsed();
	const aggregateDiscountCodes = OrderModel.aggregateDiscountsWithSameCode(
		allOrderPromotionCoupon
	);

	if (aggregateDiscountCodes.length === 0) return null;
	return (
		<List
			className="flex flex-col pl-4 mt-2"
			dataSource={aggregateDiscountCodes}
			render={(orderPromo) => {
				return (
					<Flex justify="between" align="center" gap={4}>
						<Flex gap={4}>
							<Text size="sm" variant="secondary" as="span">
								{t("coupon_label")}
							</Text>
							<Text weight="bold" as="span" size="sm">
								{orderPromo.code}
							</Text>
						</Flex>

						<Money
							minus="-"
							size="sm"
							variant="secondary"
							weight="default"
							value={orderPromo.discount}></Money>
					</Flex>
				);
			}}
		/>
	);
};
