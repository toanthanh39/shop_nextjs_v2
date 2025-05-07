import PromotionModel from "@/common/models/PromotionModel";
import { IsUse } from "@/types/Global.type";
import {
	OrderAddEdit,
	OrderItemEdit,
	OrderJson,
	OrderPromotion,
} from "@/types/Order.type";
import { ProductJson } from "@/types/Product.type";
import { PromotionDiscountType } from "@/types/Promotion.type";

class OrderCalculator {
	/////////////////////////////////////////////////////////
	// validate
	private validatePromotionReq(order: OrderJson) {}

	/////////////////////////////////////////////////////////
	// get Infor
	private getPriceProduct(product: ProductJson) {
		// xử lý trả về giá sau giảm nếu đã áp dụng promotions , trả về giá bán nếu như ko có gì đặc biệt
		// nếu có nhiều promotion trên 1 item và khác loại giảm thì phải tính dựa trên giá bán hay giá sau giảm của lần lượt từng promotion  ?
		try {
			return product.price;
		} catch (error) {
			throw new Error("get_price_product_failed");
		}
	}

	/////////////////////////////////////////////////////////
	// calculator
	private calculatorPriceFinalItems(o: OrderJson) {
		const items = o.details.data;
		try {
			return items.reduce((curr: number, prev) => {
				if (prev.is_use === IsUse.USE) {
					curr += this.getPriceProduct(prev.product_json);
				}
				return curr;
			}, 0);
		} catch (error) {
			throw new Error("calculator_pricefinal_failed");
		}
	}

	private calculatorPriceSellItems(o: OrderJson) {
		const items = o.details.data;
		try {
			return items.reduce((curr: number, prev) => {
				if (prev.is_use === IsUse.USE) {
					curr += prev.product_json.price;
				}
				return curr;
			}, 0);
		} catch (error) {
			throw new Error("calculator_pricefinal_failed");
		}
	}

	private calculatorPriceFinalOrder(order: OrderJson) {
		// const promotionBodys  = PromotionModel.get order.promotions
		try {
			const totalpriceSell = this.calculatorPriceSellItems(order);

			const promoValid = order.promotions.filter((pro) =>
				PromotionModel.getPromotionStatusValid(
					pro.promotion_detail,
					Date.now() / 1000
				)
			);
			return promoValid.reduce((curr, prev) => {
				const { req_subtotal, discount_value_type, discount_value } =
					prev.promotion_detail;
				if (req_subtotal > 0 && req_subtotal <= totalpriceSell) {
					const valueToMinus =
						discount_value_type === "amount"
							? discount_value
							: totalpriceSell * (discount_value / 100);
					curr -= valueToMinus;
				}

				return curr;
			}, 0);
		} catch (error) {
			throw new Error("calculatorPriceFinalOrder_failed");
		}
	}

	/////////////////////////////////////////////////////////
	recalculatorOrderFromJson(order: OrderJson) {
		const result = { ...order };

		const totalPriceFinalItems = this.calculatorPriceFinalItems(order);
		const totalPriceSellItems = this.calculatorPriceSellItems(order);
		const totalPayment = this.calculatorPriceFinalOrder(order);

		result.price_final = totalPayment;
		result.total_payment = totalPayment;
		result.price_sell = totalPriceSellItems;
		result.item_total = totalPriceSellItems;
		result.item_discount = Math.max(
			0,
			totalPriceFinalItems - result.price_sell
		);
		result.debt = result.price_final;
	}

	// Method to recalculate the cart JSON when an item is updated in the cart
	recalculateCartOnUpdate(order: OrderJson, data: OrderAddEdit) {
		const orderJson = { ...order };
		orderJson.details.data = order.details.data;
	}

	// Method to calculate the cart JSON when a new product is added
	calculateCartOnAdd(
		cart: any[],
		newItem: { id: string; name: string; price: number; quantity: number }
	): any[] {
		const existingItem = cart.find((item) => item.id === newItem.id);
		if (existingItem) {
			return cart.map((item) => {
				if (item.id === newItem.id) {
					return {
						...item,
						quantity: item.quantity + newItem.quantity,
						totalPrice: item.price * (item.quantity + newItem.quantity),
					};
				}
				return item;
			});
		} else {
			return [
				...cart,
				{
					...newItem,
					totalPrice: newItem.price * newItem.quantity,
				},
			];
		}
	}
}

export default OrderCalculator;
