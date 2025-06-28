import { IsUse } from "@/types/Global.type";
import { OrderJson } from "@/types/Order.type";

class CartCalculator {
	/**
	 * Tính toán tổng tiền các sản phẩm được chọn trong giỏ hàng
	 * @param cart Đối tượng đại diện đơn hàng cần tính toán
	 * @returns Tổng tiền theo ưu tiên nghiệp vụ yêu cầu (giá so sánh -> giá bán thường)
	 */
	static calculateTotalProductPrice(cart: OrderJson) {
		const { details } = cart;
		return details.data.reduce((curr: number, prev) => {
			if (prev.is_use === IsUse.USE) {
				if (prev.product_json.compare_at_price) {
					curr += prev.product_json.compare_at_price * prev.item_quantity;
				} else {
					curr += prev.item_total;
				}
			}

			return curr;
		}, 0);
	}

	/**
	 * Tính tổng tiền đã giảm từ giá so sánh xuống giá bán của tất cả item được chọn
	 * @param cart Đối tượng đại diện đơn hàng cần tính toán
	 * @returns Tổng số tiền giảm
	 */
	static calculateProductDiscount(cart: OrderJson) {
		const { details } = cart;

		// const hasSeasonalPromotion = (promotions: OrderPromotion[]) => {
		// 	return promotions.some(
		// 		(promo) =>
		// 			promo.is_use === IsUse.USE &&
		// 			promo.promotion_detail.group === PromotionGroup.seasonal
		// 	);
		// };
		return details.data.reduce((total, item) => {
			if (item.is_use === IsUse.USE) {
				total += item.product_json.compare_discount * item.item_quantity;
			}

			return total;
		}, 0);
	}

	/**
	 * Tính tổng tiền khuyến mãi (áp dụng : sản phẩm + Đơn hàng) đã giảm
	 * @param cart Đối tượng đại diện đơn hàng cần tính toán
	 * @returns Giá trị tiền đã giảm
	 */
	static calculatePromotionDiscount(cart: OrderJson) {
		const { details } = cart;
		const discountPromoItem = details.data.reduce((curr: number, prev) => {
			curr += prev.price_discount;
			return curr;
		}, 0);

		return discountPromoItem + cart.order_discount;
	}

	/**
	 * Tính tổng tât cả số tiền đã giảm trên giỏ hàng
	 * Tổng tiền tiết kiệm cho khách hàng khi thanh toán giỏ hàng
	 * @param cart Đối tượng đại diện đơn hàng cần tính toán
	 * @returns Giá trị tiền đã giảm
	 */
	static caculatorPriceSave(cart: OrderJson) {
		return (
			this.calculateProductDiscount(cart) +
			cart.item_discount +
			cart.order_discount
		);
	}

	/**
	 * Tính phí giao hàng khi mua hàng tại website - phase 1 = 0
	 * @param cart Đối tượng đại diện đơn hàng cần tính toán
	 * @returns Tiền Phí giao hàng
	 */
	static calculateShippingFee(cart: OrderJson) {
		return 0;
	}

	/**
	 * Mapping object thông tin các field đã tính toán cho giỏ hàng - view
	 * @param cart Đối tượng giỏ hàng
	 * @returns object các giá trị tiền khuyến mãi , phí ,...
	 */
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
