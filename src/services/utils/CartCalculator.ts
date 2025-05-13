import { IsUse } from "@/types/Global.type";
import { OrderJson, OrderPromotion } from "@/types/Order.type";
import { PromotionGroup, PromotionJson } from "@/types/Promotion.type";

class CartCalculator {
	static calculateTotalProductPrice(cart: OrderJson) {
		const { details } = cart;
		return details.data.reduce((curr: number, prev) => {
			if (prev.is_use === IsUse.USE) {
				if (prev.product_json.compare_at_price) {
					curr += prev.product_json.compare_at_price * prev.item_quantity;
				} else {
					curr += prev.item_unit_price * prev.item_quantity;
				}
			}
			return curr;
		}, 0);
	}
	static calculateProductDiscount(cart: OrderJson) {
		const { details } = cart;

		const hasSeasonalPromotion = (promotions: OrderPromotion[]) => {
			return promotions.some(
				(promo) =>
					promo.is_use === IsUse.USE &&
					promo.promotion_detail.group === PromotionGroup.seasonal
			);
		};
		return details.data.reduce((total, item) => {
			if (item.is_use === IsUse.USE) {
				total += item.product_json.compare_discount * item.item_quantity;
			}

			return total;
		}, 0);
	}
	static calculatePromotionDiscount(cart: OrderJson) {
		const { details } = cart;
		const discountPromoItem = details.data.reduce((curr: number, prev) => {
			curr += prev.price_discount;
			return curr;
		}, 0);

		return discountPromoItem + cart.order_discount;
	}

	static caculatorPriceSave(cart: OrderJson) {
		return (
			this.calculateProductDiscount(cart) +
			cart.item_discount +
			cart.order_discount
		);
	}
	static calculateShippingFee(cart: OrderJson) {
		return 0;
	}

	static getPriceInfor(cart: OrderJson) {
		return {
			totalProductPrice: this.calculateTotalProductPrice(cart),
			productDiscount: this.calculateProductDiscount(cart),
			promotionDiscount: this.calculatePromotionDiscount(cart),
			priceSave: this.caculatorPriceSave(cart),
			// discountSave:this.
			shippingFee: this.calculateShippingFee(cart),
		};
	}
}
export default CartCalculator;
