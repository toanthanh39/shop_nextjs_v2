import { IsUse } from "@/types/Global.type";
import {
	ActionOrderUpdate,
	OrderId,
	OrderItemJson,
	OrderJson,
	OrderPromotion,
	ValidatePromotionProps,
} from "@/types/Order.type";
import { ProductJson } from "@/types/Product.type";
import {
	PromotionDiscountType,
	PromotionGroup,
	PromotionJson,
} from "@/types/Promotion.type";
import Helper from "@/utils/helper";
import { v4 as uuidv4 } from "uuid";
import OrderConvert from "./OrderConvert";

class OrderCalculator {
	/////////////////////////////////////////////////////////
	// validate

	private checkAllPromotionOnOrderPassedToCalc(o: OrderJson) {
		const promoBody = o.promotions.filter((p) => p.is_use === IsUse.USE);
		const promoOnItems = o.details.data
			.flatMap((i) => i.promotions)
			.filter((i) => i.is_use === IsUse.USE);
		const allPromotionOnOrder = [...promoBody, ...promoOnItems];
		if (
			allPromotionOnOrder.length > 1 &&
			allPromotionOnOrder.some((i) => !i.promotion_detail.apply_with_other)
		) {
			return ["error_order_promotion_conflict_apply_with_other"];
		}

		return [];
	}

	private checkPromotionReqConditions(
		promotions: OrderPromotion[],
		order: OrderJson
	): string[] {
		// Return an empty array if there are no promotions
		if (promotions.length === 0) {
			return [];
		}

		// Extract all collection IDs present in the order
		const allCollectionIdsInOrder = order.details.data
			.filter((item) => item.is_use === IsUse.USE)
			.flatMap((item) => item.product_json.collections.map((col) => col.id));

		// Extract all required collection IDs from promotions
		const allCollectionIdsInPromotions = promotions
			.filter((op) => op.is_use === IsUse.USE)
			.flatMap((promotion) =>
				promotion.promotion_detail.req_collectionids
					.split(",")
					.map((id) => Number(id))
			);

		if (allCollectionIdsInPromotions.length <= 0) return [];

		// Check if there is any common collection ID
		const hasCommonCollectionId = allCollectionIdsInPromotions.some((id) =>
			allCollectionIdsInOrder.includes(id)
		);

		// Return ["error"] if no common element is found, otherwise []
		return hasCommonCollectionId ? [] : ["error_promotion_collection_mismatch"];
	}

	// get Infor
	private getDefaultDataItem(product: ProductJson) {
		const result: OrderItemJson = {
			order_id: 0,
			product_id: 0,
			id: uuidv4(),
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
			const result: {
				promotionOrders: OrderPromotion[];
				promotions: PromotionJson[];
			} = {
				promotionOrders: [],
				promotions: [],
			};
			for (let index = 0; index < promotions.length; index++) {
				const promotionJson = promotions[index].promotion_detail;
				const orderPromoItem = promotions[index];

				if (orderPromoItem.is_use !== IsUse.USE) {
					continue;
				}

				if (promotions.length > 1 && promotionJson.apply_with_other === false) {
					// throw new Error("error_promotion_must_not_aplly_with_other");
					continue;
				}

				if (totalPriceSellOrder < promotionJson.req_subtotal) {
					// throw new Error("error_promotion_reqsubtotal_invalid");
					continue;
				}

				if (
					on === "item" &&
					promotionJson.discount_type === PromotionDiscountType.PRODUCT
				) {
					const { product_json } = props.data;
					const collectionIdsInProduct = product_json.collections.map(
						(col) => col.id
					);

					if (
						promotionJson.group === PromotionGroup.coupon &&
						orderPromoItem.code.length <= 0
					) {
						continue;
					}

					const hasCommonValues = promotionJson.req_collectionids
						.split(",")
						.some((id) => collectionIdsInProduct.includes(Number(id)));

					if (!hasCommonValues) {
						continue;
						// throw new Error("error_promotion_collection_mismatch");
					}
				} else {
				}

				// validate on body

				result.promotions.push(promotionJson);
				result.promotionOrders.push(orderPromoItem);
			}

			return result;
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
			const { promotions: promoValid } = this.getListOrderPromotionValid({
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
					curr +=
						totalPriceSell * Math.max(0, Math.min(100, discount_value / 100));
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

			result.item_name = item.product_json.full_name;
			result.item_title = item.product_json.full_name;
			result.product_id = item.product_json.id;
			//

			result.item_total = price * item.item_quantity;
			result.item_unit_price = result.item_total;
			result.item_unit_price_original = price;

			const { promotionOrders } = this.getListOrderPromotionValid({
				on: "item",
				data: {
					order: order,
					product_json: item.product_json,
					promotions: item.promotions,
				},
			});

			result.promotions = result.promotions.map((promotionItem) => {
				const isValid = promotionOrders.some(
					(i) => i.promotion_id === promotionItem.promotion_id
				);
				return {
					...promotionItem,
					discount: !isValid
						? 0
						: this.calculatorPromotionDiscountOnItem(result, promotionItem),
				};
			});

			result.price_discount = result.promotions.reduce((curr, prev) => {
				curr += prev.discount;

				return curr;
			}, 0);

			result.price_unit_final = Math.max(
				0,
				result.item_unit_price - result.price_discount
			);
			result.price_final = result.price_unit_final;
			result.discount_percent = Math.max(
				0,
				Math.round((result.price_discount / result.item_total) * 100)
			);

			return result;
		} catch (error) {
			throw error;
		}
	}

	private calculatorPromotionDiscountOnItem(
		item: OrderItemJson,
		orderPromo: OrderPromotion
	) {
		if (item.is_use !== IsUse.USE || orderPromo.is_use !== IsUse.USE) {
			return 0;
		}

		const {
			promotion_detail: { discount_value_type, discount_value, max_applied },
		} = orderPromo;

		const result =
			discount_value_type === "amount"
				? discount_value
				: discount_value_type === "percent"
				? (discount_value / 100) * item.item_unit_price
				: 0;
		if (max_applied > 0) {
			return Math.min(max_applied, result);
		}
		return result;
	}

	private recalculatorOrderFromJson(order: OrderJson) {
		try {
			const result: OrderJson = { ...order };

			// update tiền từng item trong list
			result.details.data = order.details.data.map((item) =>
				this.calulatorItemInfor(item, result)
			);
			result.details.total = Math.max(0, result.details.data.length);

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
				result.price_sell - totalPriceFinalItems
			);
			result.price_discount = result.item_discount + result.order_discount;

			result.debt = result.price_final;
			return result;
		} catch (error) {
			throw error;
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
			let items = orderUpdate.details.data;

			const findItemIndexById = (id: OrderId) =>
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
				case "use":
					{
						const { data } = input;

						if (!Array.isArray(data) || data.length === 0) {
							throw new Error(
								"invalid_use_action_data_must_be_non_empty_array"
							);
						}

						for (const i of data) {
							const { id, is_use } = i;
							if (!id || (is_use !== IsUse.USE && is_use !== IsUse.NOT_USE)) {
								throw new Error(
									"invalid_use_action_invalid_id_or_is_use_value"
								);
							}

							const itemIndex = findItemIndexById(id);

							if (itemIndex === -1) {
								throw new Error("product_not_found_in_order_details");
							}

							items[itemIndex].is_use = is_use;
						}
					}
					break;

				case "add":
					{
						const {
							data: { product_json, item_quantity },
						} = input;
						if (item_quantity <= 0 || !product_json) {
							throw new Error("invalid_quantity_or_product_details");
						}

						const indexExited = items.findIndex(
							(i) => i.product_id === product_json.id
						);
						if (indexExited > 0) {
							items[indexExited].item_quantity += item_quantity;
						} else {
							const itemIdRes = items;
							items.unshift({
								...this.getDefaultDataItem(product_json),
								item_quantity: item_quantity,
							});
						}
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
						let errors: string[] = [];

						errors = this.checkPromotionReqConditions(promotions, orderUpdate);
						errors = this.checkAllPromotionOnOrderPassedToCalc(orderUpdate);

						if (errors.length > 0) {
							throw new Error(errors[0]);
						}
					}
					break;

				case "coupon": // update promotion nhập mã coupon cho toàn bộ order
					{
						const {
							data: {
								coupon: { code },
								promotion,
							},
						} = input;

						const promotionOrderToUpdate =
							OrderConvert.convertPromotionToOrderPromotion(
								[promotion],
								promotion.is_use
							)[0];

						promotionOrderToUpdate.code = code;

						if (promotion.discount_type === PromotionDiscountType.CART) {
							// xử lý nếu cho promotion trên body
							const indexPromotionExistedOnOrder =
								orderUpdate.promotions.findIndex(
									(p) => p.promotion_id === promotion.id
								);
							if (indexPromotionExistedOnOrder >= 0) {
								orderUpdate.promotions[indexPromotionExistedOnOrder] =
									promotionOrderToUpdate;
							} else {
								orderUpdate.promotions.push(promotionOrderToUpdate);
							}
						} else if (
							promotion.discount_type === PromotionDiscountType.PRODUCT
						) {
							// xử lý nếu cho promotion trên tất cả item sản phẩm
							items = orderUpdate.details.data.map((item) => {
								const indexPromotionExistedOnItem = item.promotions.findIndex(
									(p) => p.promotion_id === promotion.id
								);

								const updatedPromotions = item.promotions.map((promo) =>
									promo.promotion_id === promotion.id
										? { ...promo, code, is_use: promotionOrderToUpdate.is_use }
										: promo
								);

								if (indexPromotionExistedOnItem < 0) {
									updatedPromotions.push(promotionOrderToUpdate);
								}

								return {
									...item,
									promotions: updatedPromotions,
								};
							});
						}
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

	/////////////////////////////////////////////////////////
	// Method to recalculate the cart JSON when an item is updated in the cart
	recalculateOrderOnUpdate(order_old: OrderJson, data: ActionOrderUpdate) {
		try {
			const orderToUpdate = this.mappingDetailOrderFromInput(order_old, data);
			const result = this.recalculatorOrderFromJson(orderToUpdate);

			return result;
		} catch (error) {
			throw error;
		}
	}
}

export default OrderCalculator;
