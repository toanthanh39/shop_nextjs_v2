import { IsUse } from "@/types/Global.type";
import { OrderJson, OrderPromotion } from "@/types/Order.type";
import { PromotionGroup, PromotionJson } from "@/types/Promotion.type";

class OrderModel {
	order: OrderJson;

	constructor(order: OrderJson) {
		this.order = order;
	}

	public getPromotionCouponUsed() {
		const promoBody = this.order.promotions;
		const promoDetail = this.order.details.data.flatMap((i) => i.promotions);
		return [...promoBody, ...promoDetail].filter(
			(promo) =>
				promo.promotion_detail.group === PromotionGroup.coupon &&
				promo.is_use === IsUse.USE
		);
	}

	checkPromotionReqValid(promotion: PromotionJson) {
		const { price_sell, details } = this.order;
		return (
			price_sell >= promotion.req_subtotal
			// &&
			// details.data.some((item) =>
			// 	item.product_json.collections.some((c) =>
			// 		promotion.req_collectionids.split(",").includes(String(c.id))
			// 	)
			// )
		);
	}

	////////////////////////////////////////
	// static method

	static aggregateDiscountsWithSameCode(promotions: OrderPromotion[]) {
		const discountMap = promotions.reduce((acc, promo) => {
			if (!acc[promo.code]) {
				acc[promo.code] = 0;
			}
			acc[promo.code] += promo.discount;
			return acc;
		}, {} as Record<string, number>);

		return Object.entries(discountMap).map(([code, totalDiscount]) => ({
			code,
			discount: totalDiscount,
		}));
	}
}

export default OrderModel;
