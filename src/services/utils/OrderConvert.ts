import { IsUse } from "@/types/Global.type";
import { OrderPromotion } from "@/types/Order.type";
import { ProductJson } from "@/types/Product.type";
import { PromotionJson } from "@/types/Promotion.type";

import Helper from "@/utils/helper";

class OrderConvert {
	private static instance: OrderConvert;
	public static getInstance() {
		if (!OrderConvert.instance) {
			OrderConvert.instance = new OrderConvert();
		}
		return OrderConvert.instance;
	}

	static convertPromotionToOrderPromotion(
		promotions: PromotionJson[],
		// quantity?: number = 1,
		isUse?: IsUse,
		productId?: ProductJson["id"]
	): OrderPromotion[] {
		return promotions
			.filter((pro) => pro.status)
			.map((p) => {
				return Helper.convertParams({
					is_use: typeof isUse !== "undefined" ? isUse : IsUse.USE,
					code: "",
					product_id: productId,
					promotion_detail: p,
					promotion_id: p.campaign_info.id,
					sale_promotion_id: p.id,
					// item_quantity: quantity,
				});
			}) as OrderPromotion[];
	}

	static mergeOrderPromotions = (
		newPromotions: PromotionJson[],
		existingPromotions: OrderPromotion[],
		isUse?: IsUse
	): OrderPromotion[] => {
		const newPromotionOrders = this.convertPromotionToOrderPromotion(
			newPromotions,
			isUse ?? IsUse.USE
		);

		return Helper.removeDuplicatesArrObject(
			[...newPromotionOrders, ...existingPromotions],
			"promotion_id"
		).map((newPromo) => {
			const existingPromo = existingPromotions.find(
				(existing) => existing.promotion_id === newPromo.promotion_id
			);

			if (existingPromo) {
				return {
					...existingPromo,
					is_use:
						typeof isUse !== "undefined"
							? isUse
							: (existingPromo.is_use ?? IsUse.USE),
				};
			}
			return newPromo;
		});
	};
}

export default OrderConvert;
