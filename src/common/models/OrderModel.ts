import { IsUse } from "@/types/Global.type";
import { OrderJson } from "@/types/Order.type";
import { PromotionGroup } from "@/types/Promotion.type";

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
}

export default OrderModel;
