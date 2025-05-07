"use client";
import PromotionModel from "@/common/models/PromotionModel";
import { Countdown } from "@/components/composite";
import { Button, Flex, Heading, Tag, Text } from "@/components/ui";
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
		onChange: (p: PromotionJson, type: PromotionToggleProps) => Promise<any>;
	};

export default function CartPromoSeasonal({ cart, onChange }: Props) {
	const { promotions, price_sell: subtotal } = cart;

	const promotion = PromotionModel.getPromotionEffectOnCart(
		PromotionModel.getPromotionSeasonal(
			promotions.map((orderPromo) => ({
				...orderPromo.promotion_detail,
				is_use: orderPromo.is_use,
			}))
		)
	)?.[0];

	if (!promotion) return null;

	const { data: timeserver } = useTimeServer({});
	const [isLoading, handleChange] = useLoading(onChange);

	///////////////////////////////////////////////////////////

	const discountText =
		promotion.discount_value_type === "percent"
			? `${promotion.discount_value}%`
			: `${promotion.discount_value.toLocaleString()}đ`;

	const isApplied = promotion.is_use === IsUse.USE;

	const { status, remainingDays } = PromotionModel.getPromotionDateStatus(
		promotion.start_date,
		promotion.end_date,
		timeserver
	);

	// Calculate progress for the progress bar
	const progressPercentage =
		promotion.req_subtotal > 0
			? Math.min((subtotal / promotion.req_subtotal) * 100, 100)
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
				<Flex gap={4}>
					<Tag>
						Giảm {discountText}{" "}
						{promotion.discount_type === "order" ? "đơn hàng" : "sản phẩm"}
					</Tag>

					{isApplied && <Tag variant="success">Đang áp dụng</Tag>}
				</Flex>

				{/* Requirements */}
				<div>
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
				</div>

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
						<div className="mt-1 h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
							<div
								className="h-full bg-gradient-to-r from-[#d72229] to-[#b91c1c] transition-all duration-500 ease-in-out"
								style={{ width: `${progressPercentage}%` }}></div>
						</div>
					</div>
				)}

				{/* Timeline */}
				<Countdown timestamp={promotion.end_date}></Countdown>

				{/* Action Button */}
				{true && (
					<Button
						variant="secondary"
						loading={isLoading}
						onClick={() =>
							handleChange?.(promotion, !isApplied ? "aplly " : "remove")
						}
						className="w-full transition-all duration-200">
						{isApplied ? "Không áp dụng" : "Áp dụng khuyến mãi"}
					</Button>
				)}
			</Flex>
		</div>
	);
}
