import {
	PromotionGroup,
	PromotionJson,
	PromotionStatus,
} from "@/types/Promotion.type";

class PromotionModel {
	static getListPromotionValid(
		promotions: PromotionJson[],
		currentTime: number = Date.now() / 1000
	) {
		return promotions.filter(
			(p) =>
				this.getPromotionStatusValid(p, currentTime) ===
				PromotionStatus.PROCESSING
		);
	}

	static getPromotionStatusValid(item: PromotionJson, timeNow: number) {
		try {
			const { start_date, end_date } = item;
			const startDate = Number(start_date);
			const endDate = Number(end_date);

			if (isNaN(startDate) || isNaN(endDate)) {
				throw new Error("Invalid promotion date");
			}

			if (startDate > timeNow) {
				return PromotionStatus.PENDING;
			}

			if ((startDate <= timeNow && endDate >= timeNow) || endDate === 0) {
				return PromotionStatus.PROCESSING;
			}

			if (endDate < timeNow) {
				return PromotionStatus.DONE;
			}

			throw new Error("Unexpected promotion state");
		} catch (error) {
			return PromotionStatus.INVALID;
		}
	}

	static getPromotionCoupon(items: PromotionJson[]) {
		return items.filter((i) => i.group === PromotionGroup.coupon);
	}
	static getPromotionSeasonal(items: PromotionJson[]) {
		return items.filter((i) => i.group === PromotionGroup.seasonal);
	}
}
export default PromotionModel;
