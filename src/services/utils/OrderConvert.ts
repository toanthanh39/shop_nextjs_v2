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
					is_use: isUse ?? IsUse.USE,
					code: "",
					product_id: productId,
					promotion_detail: p,
					promotion_id: p.campaign_info.id,
					sale_promotion_id: p.id,
					// item_quantity: quantity,
				});
			}) as OrderPromotion[];
	}
}

export default OrderConvert;
