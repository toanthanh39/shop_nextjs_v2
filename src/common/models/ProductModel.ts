import { ProductTagJson } from "@/types/Product.type";
import { ProductJson } from "@/types/Product.type";
import { PromotionJson } from "@/types/Promotion.type";
import PromotionModel from "./PromotionModel";

class ProductModel {
	private product: ProductJson;
	private static instance: ProductModel;

	public getInstance(json: ProductJson): ProductModel {
		if (!ProductModel.instance) {
			ProductModel.instance = new ProductModel(json);
		}
		return ProductModel.instance;
	}

	constructor(json: ProductJson) {
		this.product = json;
	}

	static getPromotionTagLabels(p: ProductJson) {
		let result = [] as PromotionJson["label"][];
		const { promotions, child_promotions } = p;
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
