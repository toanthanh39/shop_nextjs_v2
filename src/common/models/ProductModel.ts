import { ProductTagJson } from "@/types/Product.type";
import { ProductJson } from "@/types/Product.type";
import { PromotionJson } from "@/types/Promotion.type";
import PromotionModel from "./PromotionModel";

class ProductModel {
	private product: ProductJson;

	constructor(json: ProductJson) {
		this.product = json;
	}

	public getPromotionTagLabels() {
		let result = [] as PromotionJson["label"][];
		const { promotions, child_promotions } = this.product;
		result = PromotionModel.getListPromotionValid(promotions).map(
			(p) => p.label
		);
		return result;
	}

	static getCardTagVariant(tag: ProductTagJson) {
		switch (tag.code) {
			case "limited-edition":
				return "default";
			case "nam":
				return "genderMale";
			case "nu":
				return "genderFemale";
			default:
				return "primary";
		}
	}
}

export default ProductModel;
