"use client";
import { imageConst } from "@/common/constants/image";
import PromotionModel from "@/common/models/PromotionModel";
import Popup from "@/components/composite/Popup";
import GenericForm from "@/components/form/GenericForm";
import {
	Button,
	CustomImage,
	Empty,
	Flex,
	Heading,
	Input,
	Tag,
	Text,
} from "@/components/ui";
import useCartGlobal from "@/lib/hooks/cache/useCartGlobal";
import usePromotion from "@/lib/hooks/cache/usePromotion";
import useGenericFormMethods from "@/lib/hooks/form/useGenericFormMethods";
import { ComProps } from "@/types/Component";
import { IsUse } from "@/types/Global.type";
import { OrderJson } from "@/types/Order.type";
import { PromotionGroup, PromotionJson } from "@/types/Promotion.type";
import { cn, debounce } from "@/utils/utils";
import { useEffect, useState } from "react";
import { z } from "zod";

enum Status {
	expired,
	onhand,
	comming,
}
const getEventStatus = (startTimestamp: number, endTimestamp: number) => {
	const now = new Date().getTime() / 1000; // Thời gian hiện tại dưới dạng timestamp

	// Kiểm tra nếu sự kiện chưa bắt đầu
	if (now < startTimestamp) {
		const diffTime = Math.abs(startTimestamp - now);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return {
			label: `Coming in ${diffDays} days`,
			status: Status.comming,
		};
	}

	// Kiểm tra nếu sự kiện đã kết thúc
	if (now > endTimestamp) {
		return {
			label: "Hết hạn",
			status: Status.expired,
		};
	}

	// Nếu trong thời gian hiệu lực
	const diffTime = Math.abs(endTimestamp - now);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return {
		label: `${diffDays} days`,
		status: Status.onhand,
	};
};

const getActivePromo = (promo: PromotionJson, cart: OrderJson) => {
	const allPromoCouponInCart = [
		...cart.promotions,
		...cart.details.data.flatMap((i) => i.promotions),
	].filter((pro) => pro.promotion_detail.group === PromotionGroup.coupon);

	return allPromoCouponInCart.find(
		(i) => i.promotion_id === promo.id && i.is_use === IsUse.USE
	);
};

type Props = ComProps & {
	cart: OrderJson;
};

export default function CartCoupon({ className, cart }: Props) {
	const { data: promotions } = usePromotion({});
	const { addCouponToCart, isUpdating } = useCartGlobal({});
	const promotionCoupons = PromotionModel.getPromotionCoupon(promotions ?? []);

	//////////////////////////////////////////////

	const [promoViewMore, setPromoViewMore] = useState<PromotionJson | undefined>(
		undefined
	);

	const toggleModal = debounce((pro?: PromotionJson) => {
		setPromoViewMore(pro);
	}, 200);
	//////////////////////////////////////////////

	const validationSchema = z.object({
		code: z.string().min(1, "Code is required"),
	});
	type FormData = z.infer<typeof validationSchema>;

	const defaultValues: FormData = {
		code: "",
	};
	const methods = useGenericFormMethods({
		defaultValues: {
			code: "",
		},
		validationSchema,
	});
	//////////////////////////////////////////////

	const handleSubmit = debounce(async (data: FormData) => {
		try {
			const result = await addCouponToCart({ code: data.code });
		} catch (error) {
			console.log("🚀 ~ handleSubmit ~ error:", error);
		}
	}, 200);

	const onPickCode = (code: string) => {
		methods.setValue("code", code);
		toggleModal(undefined);
	};

	return (
		<>
			<GenericForm
				methods={methods}
				onSubmit={methods.handleSubmit(handleSubmit)}
				className={cn(className)}>
				<Heading level={2} size="h4">
					Mã khuyến mãi
				</Heading>
				<Flex align="start" gap={8}>
					<GenericForm.Item name="code">
						<Input variant="border"></Input>
					</GenericForm.Item>
					<GenericForm.Submit
						disabled={isUpdating}
						loading={isUpdating}
						variant="default"
						size="sm"
						className="m-0">
						Áp dụng
					</GenericForm.Submit>
				</Flex>
			</GenericForm>

			<Flex gap={4} wrap="wrap" className="mt-1">
				{promotionCoupons.map((promoCoupon) => {
					const status = getEventStatus(
						promoCoupon.start_date,
						promoCoupon.end_date
					);

					return (
						<Flex
							align="center"
							key={promoCoupon.id}
							gap={4}
							className={cn(
								"relative w-full h-10 p-2  rounded-md overflow-hidden bg-gray-100 border border-gray-300 ",
								{
									"opacity-50": status.status !== Status.onhand,
								}
							)}>
							{/* QR Code Placeholder */}
							<div className="shrink-0">
								<CustomImage
									src={imageConst.blur_url}
									alt="coupon"
									width={40}
									height={40}></CustomImage>
							</div>
							{/* Coupon Info */}
							<Flex direction="col">
								<Text
									as="span"
									size="sm"
									title={promoCoupon.campaign_info.name}
									className="text-green-600 font-bold line-clamp-1">
									{promoCoupon.campaign_info.name}
								</Text>
								<Text
									as="span"
									size="xxs"
									className="text-red-500 font-bold whitespace-nowrap">
									{status.label}
								</Text>
							</Flex>
							{/* Days and Show Button */}
							<Flex
								direction="col"
								align="end"
								gap={2}
								className="flex-1 shrink-0">
								<Tag
									className="whitespace-nowrap "
									onClick={() => toggleModal(promoCoupon)}>
									<Text.small variant="none">Chi tiết</Text.small>
								</Tag>
							</Flex>
						</Flex>
					);
				})}
			</Flex>
			{promoViewMore && (
				<Popup
					title={`Mã giảm giá - ${promoViewMore?.campaign_info?.name}`}
					open={!!promoViewMore}
					onOpenChange={() => toggleModal()}>
					<div className="bg-white rounded-lg w-full max-w-md">
						<Text.small>{promoViewMore.campaign_info.description}</Text.small>
						<Empty dataSource={promoViewMore?.codes ?? []}>
							<ul>
								{promoViewMore?.codes?.map((code) => {
									const isss = getActivePromo(promoViewMore, cart);
									const isUsed =
										getActivePromo(promoViewMore, cart)?.code === code.code;

									return (
										<li
											key={code.id}
											className="flex justify-between items-center py-2 border-b">
											<span className="text-gray-700">{code.code}</span>
											<Button
												disabled={isUsed}
												variant="primary"
												onClick={() => !isUsed && onPickCode(code.code)}>
												{isUsed ? "Đã dùng" : "Lấy mã"}
											</Button>
										</li>
									);
								})}
							</ul>
						</Empty>
					</div>
				</Popup>
			)}
		</>
	);
}
