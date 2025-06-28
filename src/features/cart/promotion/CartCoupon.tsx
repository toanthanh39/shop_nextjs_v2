"use client";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import OrderModel from "@/services/models/OrderModel";
import PromotionModel from "@/services/models/PromotionModel";
import BaseApi from "@/lib/axios/BaseApi";
import { CartProps } from "@/types/Cart.type";
import { ComProps } from "@/types/Component";
import { CouponJson } from "@/types/Coupon.type";
import { IsUse } from "@/types/Global.type";
import { OrderJson, OrderPromotion } from "@/types/Order.type";
import { PromotionGroup, PromotionJson } from "@/types/Promotion.type";

import { DateStatusResult } from "@/components/composite";
import Popup from "@/components/composite/Popup";
import GenericForm from "@/components/forms/GenericForm";
import { CloseIcon } from "@/components/icons";
import {
	Button,
	CustomImage,
	Empty,
	Flex,
	Heading,
	Input,
	List,
	Space,
	Tag,
	Text,
} from "@/components/ui";

import { imageConst } from "@/common/constants/image";
import useCartGlobal from "@/lib/hooks/cache/useCartGlobal";
import usePromotion from "@/lib/hooks/cache/usePromotion";
import useTimeServer from "@/lib/hooks/cache/useTimeServer";
import useGenericFormMethods from "@/lib/hooks/form/useGenericFormMethods";
import Helper from "@/utils/helper";
import { cn, debounce } from "@/utils/utils";

const getActivePromo = (promo: PromotionJson, cart: OrderJson) => {
	const allPromoCouponInCart = [
		...cart.promotions,
		...cart.details.data.flatMap((i) => i.promotions),
	]
		.filter(
			(pro) =>
				pro.promotion_detail.group === PromotionGroup.coupon &&
				pro.is_use === IsUse.USE
		)
		.find((i) => {
			return i.promotion_id === promo.id;
		});

	return allPromoCouponInCart;
};

type Props = ComProps & CartProps & {};

export default function CartCoupon({ className, cart }: Props) {
	const OrderInstance = new OrderModel(cart);

	const t = useTranslations("cart.cart_errors");
	const { data: promotions } = usePromotion({});
	const { data: timeserver } = useTimeServer({ enabled: !!promotions });
	const { updateCart, isUpdating } = useCartGlobal({});

	const promotionCoupons = PromotionModel.getPromotionCoupon(promotions ?? []);

	//////////////////////////////////////////////
	const [promoViewMore, setPromoViewMore] = useState<PromotionJson | undefined>(
		undefined
	);

	//////////////////////////////////////////////
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
		defaultValues: defaultValues,
		validationSchema,
	});

	//////////////////////////////////////////////
	const handleSubmit = debounce(async (data: FormData) => {
		try {
			const promotionCouponToApplies = promotionCoupons.filter((i) =>
				i.codes?.flatMap((c) => c.code).includes(data.code)
			);

			if (promotionCouponToApplies.length <= 0) {
				methods.setError("code", {
					type: "manual",
					message: "Mã khuyến mãi không hợp lệ hoặc đã hết hạn.",
				});
				return;
			}
			await Promise.allSettled(
				promotionCouponToApplies.map(async (promo) => {
					const isApplied = getActivePromo(promo, cart);
					if (isApplied) {
						methods.setError("code", {
							type: "manual",
							message: "Mã khuyến mãi đã được áp dụng.",
						});
						return;
					}
					const couponCode = promo.codes?.find((c) => c.code === data.code);
					if (!couponCode) return;

					return await updateCart({
						action: "coupon",
						data: {
							coupon: couponCode,
							promotion: { ...promo, is_use: IsUse.USE },
						},
					});
				})
			);
			// const result = await updateCart({
			// 	action: "coupon",
			// 	data: { code: data.code },
			// });
		} catch (error) {
			console.log("🚀 ~ handleSubmit ~ error:", error);
		}
	}, 200);

	const onPickCode = (coupon: CouponJson) => {
		methods.setValue("code", coupon.code);
		toggleModal(undefined);
	};

	const onRemoveCode = debounce(
		async (code: string, o_promotion: OrderPromotion) => {
			try {
				const couponCode = promotionCoupons
					.flatMap((pc) => pc?.codes ?? [])
					?.find((c) => c.code === code);
				if (!couponCode) return;
				await updateCart({
					action: "coupon",
					data: {
						coupon: couponCode,
						promotion: {
							...o_promotion.promotion_detail,
							is_use: IsUse.NOT_USE,
						},
					},
				});
			} catch (error) {
				const errorKey =
					BaseApi.handleError(error).errors?.[0] || "unknown_error";
				toast.error(t(errorKey));
			}
		},
		200
	);

	//////////////////////////////////////////////
	const promoCouponUsed = useMemo(() => {
		return Helper.removeDuplicatesArrObject(
			OrderInstance.getPromotionCouponUsed(),
			"code"
		);
	}, [JSON.stringify(cart.details.data)]);

	//////////////////////////////////////////////
	return (
		<Space>
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
						variant="default"
						size="sm"
						className="m-0">
						Áp dụng
					</GenericForm.Submit>
				</Flex>
			</GenericForm>

			{/* render list code coupon đã sử dụng  */}
			<List
				className={cn(" gap-1", {
					"my-2": promoCouponUsed.length > 0,
				})}
				classNameItem="inline-block w-fit "
				dataSource={promoCouponUsed}
				render={(couponUsed, index) => {
					return (
						<Tag key={index} variant="primary" className="py-1">
							{couponUsed.code}{" "}
							<CloseIcon
								isLoading={isUpdating}
								disabled={isUpdating}
								size="sm"
								onClick={() => onRemoveCode(couponUsed.code, couponUsed)}
							/>
						</Tag>
					);
				}}></List>

			{/* render list chương trình (hợp lệ) */}
			<Flex
				gap={4}
				wrap="wrap"
				className="mt-1 max-h-30 overflow-y-auto hide-scroll-bar">
				{promotionCoupons.map((promoCoupon) => {
					const { status, remainingDays } =
						PromotionModel.getPromotionDateStatus(
							promoCoupon.start_date,
							promoCoupon.end_date,
							timeserver ?? 0
						);

					return (
						<Flex
							align="center"
							key={promoCoupon.id}
							gap={4}
							className={cn(
								"relative w-full h-auto px-1 py-1 rounded-md overflow-hidden bg-gray-100 border border-gray-300 ",
								{
									"opacity-50": status !== "running",
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
									variant="secondary"
									title={promoCoupon.campaign_info.name}
									className="font-bold line-clamp-1">
									{promoCoupon.campaign_info.name}
								</Text>
								<DateStatusResult
									remainingDays={remainingDays}
									status={status}
								/>
							</Flex>
							{/* Days and Show Button */}

							<Flex
								direction="col"
								align="end"
								gap={2}
								className="flex-1 shrink-0">
								<Tag
									className="whitespace-nowrap cursor-pointer "
									onClick={() => toggleModal(promoCoupon)}>
									<Text.small variant="none">Chi tiết</Text.small>
								</Tag>
							</Flex>
						</Flex>
					);
				})}
			</Flex>
			<Popup
				title={`Mã giảm giá - ${promoViewMore?.campaign_info?.name}`}
				open={!!promoViewMore}
				onOpenChange={() => toggleModal()}
				className="min-h-50 ">
				{promoViewMore && (
					<div className="bg-white rounded-lg w-full max-w-md">
						<Text.small>{promoViewMore.campaign_info.description}</Text.small>
						<Empty dataSource={promoViewMore?.codes ?? []}>
							<ul>
								{promoViewMore?.codes?.map((code) => {
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
												onClick={() => !isUsed && onPickCode(code)}>
												{isUsed ? "Đã dùng" : "Lấy mã"}
											</Button>
										</li>
									);
								})}
							</ul>
						</Empty>
					</div>
				)}
			</Popup>
		</Space>
	);
}
