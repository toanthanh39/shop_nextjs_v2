import { IsUse } from "@/types/Global.type";
import { OrderJson, OrderPromotion } from "@/types/Order.type";
import { PromotionGroup, PromotionJson } from "@/types/Promotion.type";

class CartCalculator {
	private static calculateTotalProductPrice(cart: OrderJson) {
		const {
			details: { data },
		} = { ...cart };
		const result = data.reduce((totalPrice, item) => {
			if (item.is_use === IsUse.USE) {
				const price =
					item.product_json.compare_at_price > 0
						? item.product_json.compare_at_price
						: item.product_json.price;
				totalPrice += price * item.item_quantity;
			}

			return totalPrice;
		}, 0);
		console.log(
			"🚀 ~ CartCalculator ~ calculateTotalProductPrice ~ result:",
			result
		);

		return result;
	}
	private static calculateProductDiscount(cart: OrderJson) {
		const { details } = cart;

		const hasSeasonalPromotion = (promotions: OrderPromotion[]) => {
			return promotions.some(
				(promo) =>
					promo.is_use === IsUse.USE &&
					promo.promotion_detail.group === PromotionGroup.seasonal
			);
		};
		return details.data.reduce((total, product) => {
			if (product.is_use === IsUse.NOT_USE) return total;
			const discount = hasSeasonalPromotion(product.promotions)
				? product.price_discount
				: 0;

			const itemTotal =
				product.product_json.compare_discount * product.item_quantity;
			return total + discount + itemTotal;
		}, 0);
	}
	private static calculatePromotionDiscount(cart: OrderJson) {
		const { details } = cart;

		return details.data.reduce((curr: number, prev) => {
			if (prev.is_use === IsUse.USE) {
				curr += prev.price_discount;
			}
			return curr;
		}, 0);
	}
	private static calculateShippingFee(cart: OrderJson) {
		return 0;
	}

	static getPriceInfor(cart: OrderJson) {
		return {
			totalProductPrice: this.calculateTotalProductPrice(cart),
			productDiscount: this.calculateProductDiscount(cart),
			promotionDiscount: this.calculatePromotionDiscount(cart),
			shippingFee: this.calculateShippingFee(cart),
		};
	}
}
export default CartCalculator;
