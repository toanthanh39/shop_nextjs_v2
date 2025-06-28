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

	/**
	 * Chuyển đổi tất cả đối tượng promotion raw -> promotion order raw
	 * @param promotions List Khuyến mãi
	 * @param isUse Thông tin cờ đánh dấu cho pheps tính toán
	 * @param productId mã ID sản phẩm
	 * @returns List json  OrderPromotion đã chuyển đổi
	 */
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

	/**
	 * Gộp unit list Promotion
	 * @param newPromotions List promotion mới cần gộp
	 * @param existingPromotions List promotion đã tồn tại
	 * @param isUse Thông tin cờ đánh dấu cho pheps tính toán
	 * @returns  list Unit Promotion
	 */
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
