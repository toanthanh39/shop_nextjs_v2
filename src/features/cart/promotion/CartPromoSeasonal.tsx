"use client";
import OrderModel from "@/common/models/OrderModel";
import PromotionModel from "@/common/models/PromotionModel";
import { Countdown } from "@/components/composite";
import { Button, Flex, Heading, List, Tag, Text } from "@/components/ui";
import { MotionItem } from "@/components/ui/motion";
import usePromotion from "@/lib/hooks/cache/usePromotion";
import useTimeServer from "@/lib/hooks/cache/useTimeServer";
import useLoading from "@/lib/hooks/useLoading";
import { CartProps } from "@/types/Cart.type";
import { ComProps } from "@/types/Component";
import { IsUse } from "@/types/Global.type";
import { PromotionJson, PromotionToggleProps } from "@/types/Promotion.type";
import { debounce } from "@/utils/utils";
import { CheckIcon, ClockIcon } from "lucide-react";

type Props = ComProps &
	CartProps & {
		onChange?: (p: PromotionJson, type: PromotionToggleProps) => Promise<any>;
	};

export default function CartPromoSeasonal({
	cart,
	onChange = async (p: PromotionJson, type: PromotionToggleProps) => null,
}: Props) {
	const { price_sell: subtotal } = cart;
	const { data: fullPromotion } = usePromotion({});

	const promoSeasonalCarts = PromotionModel.getPromotionEffectOnCart(
		PromotionModel.getPromotionSeasonal(fullPromotion ?? [])
	);

	if (promoSeasonalCarts.length <= 0) return null;

	const { data: timeserver } = useTimeServer({});
	const [isLoading, handleChange] = useLoading(onChange);

	///////////////////////////////////////////////////////////

	return (
		<List
			className="flex-col"
			classNameItem="w-full"
			dataSource={promoSeasonalCarts}
			render={(promotion) => {
				return (
					<RenderItem
						cart={cart}
						key={promotion.id}
						promotion={promotion}
						timeserver={timeserver}
						onChange={handleChange}
						isLoading={isLoading}
					/>
				);
			}}></List>
	);
}

type RenderItemProps = Pick<Props, "onChange" | "isLoading" | "cart"> & {
	promotion: PromotionJson;
	timeserver: number;
};
const RenderItem = ({
	cart,
	promotion,
	timeserver,
	isLoading,
	onChange,
}: RenderItemProps) => {
	const OrderInstance = new OrderModel(cart);

	const isReqValid = OrderInstance.checkPromotionReqValid(promotion);
	const subtotal = cart.price_sell;
	const isApplied =
		cart.promotions.find((p) => p.promotion_id === promotion.id)?.is_use ===
		IsUse.USE;

	// const { status, remainingDays } = PromotionModel.getPromotionDateStatus(
	// 	promotion.start_date,
	// 	promotion.end_date,
	// 	timeserver
	// );

	// Calculate progress for the progress bar
	const progressPercentage =
		promotion.req_subtotal > 0
			? Math.min((cart.price_sell / promotion.req_subtotal) * 100, 100)
			: 0;
	return (
		<div className="relative overflow-hidden bg-white transition-all">
			{/* Status Badge */}

			<Flex direction="col" gap={8} className="relative">
				{/* Header */}
				<Heading level={3} size="h4" weight="bold">
					{promotion.campaign_info.name}
				</Heading>

				{/* Discount Info */}
				{/* <Flex gap={4}>
					<Tag>
						Giảm {discountText}{" "}
						{promotion.discount_type === "order" ? "đơn hàng" : "sản phẩm"}
					</Tag>

				</Flex> */}
				<MotionItem show={isApplied}>
					<Tag variant="success">Đang áp dụng</Tag>
				</MotionItem>

				{/* Requirements */}
				<>
					{promotion.req_subtotal > 0 && (
						<Flex align="center" gap={4}>
							<CheckIcon size={18} />
							<Text as="span">
								Đơn tối thiểu {promotion.req_subtotal.toLocaleString()}đ
							</Text>
						</Flex>
					)}
					{promotion.req_quantity > 0 && (
						<Flex align="center" gap={4}>
							<CheckIcon />
							<span>Số lượng tối thiểu: {promotion.req_quantity}</span>
						</Flex>
					)}
				</>

				{/* Progress Bar */}
				{promotion.req_subtotal > 0 && (
					<div className="w-full">
						<Flex justify="between">
							<Text as="span" size="sm" weight="semibold">
								{subtotal.toLocaleString()}đ
							</Text>
							<Text as="span" size="sm" weight="semibold">
								{promotion.req_subtotal.toLocaleString()}đ
							</Text>
						</Flex>

						<div className="mt-1 h-2.5 w-full rounded-full bg-gray-100 overflow-hidden ">
							<div
								className="relative h-full rounded-full overflow-hidden bg-gradient-to-r from-[#ed393f] to-[#d72229] transition-all duration-500 ease-in-out"
								style={{ width: `${progressPercentage}%` }}>
								<div className="absolute inset-0  skeleton-loading"></div>
							</div>
						</div>
					</div>
				)}

				{/* Timeline */}
				<Countdown timestamp={promotion.end_date}></Countdown>

				{/* Action Button */}
				{true && (
					<Button
						disabled={!isReqValid}
						variant="secondary"
						loading={isLoading}
						onClick={() =>
							onChange?.(promotion, !isApplied ? "aplly " : "remove")
						}
						className="w-full transition-all duration-200">
						{!isReqValid ? (
							"Chưa đạt điều kiện"
						) : (
							<>{isApplied ? "Không áp dụng" : "Áp dụng khuyến mãi"}</>
						)}
					</Button>
				)}
			</Flex>
		</div>
	);
};
