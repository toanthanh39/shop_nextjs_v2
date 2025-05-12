import PromotionModel from "@/common/models/PromotionModel";
import BaseApi from "@/lib/axios/BaseApi";
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
import { PromotionDiscountType, PromotionJson } from "@/types/Promotion.type";
import Helper from "@/utils/helper";

class OrderCalculator {
	/////////////////////////////////////////////////////////
	// validate

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

	private getDefaultDataItem(product: ProductJson) {
		const result: OrderItemJson = {
			order_id: 0,
			product_id: 0,
			id: 0,
			is_use: IsUse.USE,
			item_title: "",
			item_name: "",
			item_quantity: 0,
			item_unit_price_original: 0,
			item_unit_price: 0,
			item_total: 0,
			price_discount: 0,
			discount_percent: 0,
			price_final: 0,
			price_unit_final: 0,
			item_vat: 0,
			price_vat: 0,
			promotions: [],
			product_json: product,
			item_date_deleted: 0,
		};

		return result;
	}

	private getListOrderPromotionValid(props: ValidatePromotionProps) {
		try {
			const {
				data: { order, promotions },
				on,
			} = props;
			const totalPriceSellOrder = this.calculatorPriceSellItems(order);
			const result: PromotionJson[] = [];
			for (let index = 0; index < promotions.length; index++) {
				const element = promotions[index].promotion_detail;
				const orderPromoItem = promotions[index];

				if (orderPromoItem.is_use !== IsUse.USE) {
					continue;
				}

				if (promotions.length > 1 && element.apply_with_other === false) {
					throw new Error("error_promotion_must_not_aplly_with_other");
				}

				if (totalPriceSellOrder < element.req_subtotal) {
					throw new Error("error_promotion_must_not_aplly_with_other");
				}

				if (
					on === "item" &&
					element.discount_type === PromotionDiscountType.PRODUCT
				) {
					const { product_json } = props.data;
					const { req_collectionids } = element;

					const collectionIdsInProduct = product_json.collections.map(
						(col) => col.id
					);

					const hasCommonValues = req_collectionids
						.split(",")
						.some((id) => collectionIdsInProduct.includes(Number(id)));

					if (!hasCommonValues) {
						throw new Error("error_promotion_collection_mismatch");
					}
				} else {
				}

				// validate on body

				result.push(element);
			}

			return result;

			// validate on item
		} catch (error) {
			throw error;
		}
	}

	/////////////////////////////////////////////////////////
	// calculator
	private calculatorPriceFinalItems(o: OrderJson) {
		const order = { ...o };
		const items = order.details.data;
		try {
			return items.reduce((curr: number, prev) => {
				if (prev.is_use === IsUse.USE) {
					curr += prev.price_final;
				}
				return curr;
			}, 0);
		} catch (error) {
			throw new Error("calculator_pricefinal_failed");
		}
	}

	private calculatorPriceSellItems(o: OrderJson) {
		const order = { ...o };
		const items = order.details.data;
		try {
			return items.reduce((curr: number, prev) => {
				if (prev.is_use === IsUse.USE) {
					curr += prev.product_json.price * prev.item_quantity;
				}
				return curr;
			}, 0);
		} catch (error) {
			throw new Error("calculator_pricefinal_failed");
		}
	}

	private calculatorOrderDiscount(o: OrderJson) {
		const order = { ...o };
		// const promotionBodys  = PromotionModel.get order.promotions

		const totalPriceSell = this.calculatorPriceSellItems(order);

		try {
			const promoValid = this.getListOrderPromotionValid({
				on: "body",
				data: {
					order: order,
					promotions: order.promotions,
				},
			});

			return promoValid.reduce((curr, prev) => {
				const { req_subtotal, discount_value_type, discount_value } = prev;
				if (discount_value_type === "amount") {
					curr += discount_value;
				} else if (discount_value_type === "percent") {
					curr += totalPriceSell * Math.min(100, discount_value / 100);
				}
				if (prev.max_applied > 0) {
					return Math.min(prev.max_applied, curr);
				} else {
					return curr;
				}
			}, 0);
		} catch (error) {
			throw error;
		}
	}

	private calulatorItemInfor(item: OrderItemJson, order: OrderJson) {
		try {
			const { price } = item.product_json;
			const result: OrderItemJson = { ...item };

			if (item.is_use !== IsUse.USE) {
				return result;
			}
			item.id = item.id;
			result.item_name = item.product_json.full_name;
			result.item_title = item.product_json.full_name;
			result.product_id = item.product_json.id;
			//

			result.item_total = price * item.item_quantity;

			result.item_unit_price = price * item.item_quantity;

			result.price_discount = this.getListOrderPromotionValid({
				on: "item",
				data: {
					order: order,
					product_json: item.product_json,
					promotions: item.promotions,
				},
			}).reduce((curr, prev) => {
				if (prev.discount_value_type === "amount") {
					curr -= prev.discount_value;
				} else if (prev.discount_value_type === "percent") {
					curr -= price * prev.discount_value;
				}

				return curr;
			}, 0);

			result.price_unit_final = result.item_unit_price - result.price_discount;
			result.price_final = result.price_unit_final;
			result.discount_percent = Math.round(
				(result.price_discount / result.item_total) * 100
			);

			return result;
		} catch (error) {
			throw error;
		}
	}

	private recalculatorOrderFromJson(order: OrderJson) {
		try {
			const result: OrderJson = { ...order };
			// update tiền từng item trong list

			result.details.data = order.details.data.map((item) =>
				this.calulatorItemInfor(item, order)
			);

			const totalPriceFinalItems = this.calculatorPriceFinalItems(result);
			const totalPriceSellItems = this.calculatorPriceSellItems(result);
			const orerDiscount = this.calculatorOrderDiscount(result);

			const totalPayment = Math.max(0, totalPriceFinalItems - orerDiscount);

			result.order_discount = orerDiscount;
			result.price_final = totalPayment;
			result.total_payment = totalPayment;
			result.price_sell = totalPriceSellItems;
			result.item_total = totalPriceSellItems;
			result.item_discount = Math.max(
				0,
				totalPriceFinalItems - result.price_sell
			);

			result.debt = result.price_final;
			result.details.total = Math.max(0, result.details.data.length);
			return result;
		} catch (error) {
			throw error;
		}
	}

	///////////////////////////////////////
	// mapping
	private mappingDetailOrderFromInput(
		order_old: OrderJson,
		input: ActionOrderUpdate
	) {
		const orderUpdate: OrderJson = { ...order_old };

		try {
			let items = orderUpdate.details.data;

			const findItemIndexById = (id: number) =>
				items.findIndex((item) => item.id === id);

			switch (input.action) {
				case "quantity": {
					const { id, item_quantity } = input.data;

					if (!id) {
						throw new Error(`error_invalid_item_${id}`);
					}

					if (item_quantity <= 0 || !id) {
					}

					const itemIndex = findItemIndexById(id);

					if (itemIndex === -1) {
						throw new Error("product_not_found_in_order_details");
					}

					items[itemIndex].item_quantity = item_quantity;

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
				case "add":
					{
						const {
							data: { product_json, item_quantity },
						} = input;
						if (item_quantity <= 0 || !product_json) {
							throw new Error("invalid_quantity_or_product_details");
						}
						items.unshift({
							...this.getDefaultDataItem(product_json),
							item_quantity: item_quantity,
						});
					}
					break;

				case "remove":
					{
						const {
							data: { ids },
						} = input;

						ids.forEach((id) => {
							const itemIndex = findItemIndexById(id);
							if (itemIndex === -1) {
								throw new Error("product_not_found_in_order_details");
							}

							items.splice(itemIndex, 1);
						});
					}

					break;
				case "promotion":
					{
						const {
							data: { promotions },
						} = input;

						orderUpdate.promotions = Helper.removeDuplicatesArrObject(
							promotions,
							"promotion_id"
						);
					}
					break;

				default:
					throw new Error("invalid_action_action_type_not_recognized");
			}

			orderUpdate.details.data = items;
			return orderUpdate;
		} catch (error) {
			throw error;
		}
	}

	// Method to recalculate the cart JSON when an item is updated in the cart
	recalculateOrderOnUpdate(order_old: OrderJson, data: ActionOrderUpdate) {
		try {
			// Create a deep copy of the order to avoid mutating the original object
			const orderToUpdate = this.mappingDetailOrderFromInput(order_old, data);
			const result = this.recalculatorOrderFromJson(orderToUpdate);
			console.log(
				"🚀 ~ OrderCalculator ~ recalculateOrderOnUpdate ~ result:",
				result
			);
			return result;
		} catch (error) {
			throw error;
		}
	}
}

export default OrderCalculator;
