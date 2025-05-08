import PromotionModel from "@/common/models/PromotionModel";
import { IsUse } from "@/types/Global.type";
import {
	ActionOrderUpdate,
	OrderAddEdit,
	OrderItemEdit,
	OrderItemJson,
	OrderJson,
	OrderPromotion,
	ValidatePromotionProps,
} from "@/types/Order.type";
import { ProductJson } from "@/types/Product.type";
import { PromotionDiscountType } from "@/types/Promotion.type";

class OrderCalculator {
	/////////////////////////////////////////////////////////
	// validate

	private validateListPromotionValid(props: ValidatePromotionProps) {
		try {
			const {
				data: { order, promotions },
				on,
			} = props;

			const totalPriceSellOrder = this.calculatorPriceSellItems(order);

			for (let index = 0; index < promotions.length; index++) {
				const element = promotions[index];
				if (promotions.length > 1 && element.apply_with_other === false) {
					throw new Error("error_promotion_must_not_aplly_with_other");
				}

				if (totalPriceSellOrder < element.req_subtotal) {
					throw new Error("error_promotion_must_not_aplly_with_other");
				}
			}
		} catch (error) {}
	}

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

	/////////////////////////////////////////////////////////
	// mapping
	private mappingDetailOrderFromInput(
		order_old: OrderJson,
		input: ActionOrderUpdate
	) {
		const orderUpdate: OrderJson = { ...order_old };

		try {
			const {
				details: { data: items },
			} = orderUpdate;

			const findItemIndexById = (id: number) =>
				items.findIndex((item) => item.id === id);

			switch (input.action) {
				case "quantity": {
					const { id, item_quantity, product_json } = input.data;

					if (item_quantity <= 0 || !product_json || !id) {
						throw new Error("invalid_quantity_or_product_details");
					}

					const itemIndex = findItemIndexById(id);

					if (itemIndex === -1) {
						throw new Error("product_not_found_in_order_details");
					}

					items[itemIndex].item_quantity = item_quantity;
					items[itemIndex].product_json = product_json;

					break;
				}
				case "variant": {
					const { id, produt_variant_json } = input.data;

					if (!produt_variant_json || !id) {
						throw new Error("invalid_variant_details");
					}

					const itemIndex = findItemIndexById(id);

					if (itemIndex === -1) {
						throw new Error("variant_not_found_in_order_details");
					}
					items[itemIndex].product_json = produt_variant_json;

					// Update specific variant details as needed
					// Example (assuming there is a variant field): items[itemIndex].variant = produt_variant_json;

					break;
				}
				case "use": {
					const { data } = input;

					if (!Array.isArray(data) || data.length === 0) {
						throw new Error("invalid_use_action_data_must_be_non_empty_array");
					}

					data.forEach(({ id, is_use }) => {
						if (!id || (is_use !== IsUse.USE && is_use !== IsUse.NOT_USE)) {
							throw new Error("invalid_use_action_invalid_id_or_is_use_value");
						}

						const itemIndex = findItemIndexById(id);

						if (itemIndex === -1) {
							throw new Error(`item_with_id_${id}_not_found_in_order_details`);
						}

						items[itemIndex].is_use = is_use;
					});
					break;
				}
				default:
					throw new Error("invalid_action_action_type_not_recognized");
			}

			return orderUpdate;
		} catch (error) {
			throw error;
		}
	}

	/////////////////////////////////////////////////////////
	// calculator
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

	private calulatorItemInfor(item: OrderItemJson) {
		try {
			const result: OrderItemJson = { ...item };
			result.item_name = item.product_json.full_name;
			result.item_title = item.product_json.full_name;
			result.product_id = item.product_json.id;
			//

			result.item_total = item.product_json.price * item.item_quantity;

			return result;
		} catch (error) {
			throw new Error("error_calulatorPriceItemInfor_failed");
		}
	}

	/////////////////////////////////////////////////////////
	private recalculatorOrderFromJson(order: OrderJson) {
		try {
			const result: OrderJson = { ...order };

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

			return result;
		} catch (error) {
			throw error;
		}
	}

	// Method to recalculate the cart JSON when an item is updated in the cart
	recalculateOrderOnUpdate(order_old: OrderJson, data: ActionOrderUpdate) {
		try {
			// Validate input data

			// Create a deep copy of the order to avoid mutating the original object
			const orderToUpdate = this.mappingDetailOrderFromInput(order_old, data);

			return this.recalculatorOrderFromJson(orderToUpdate);
		} catch (error) {
			throw error;
		}
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
