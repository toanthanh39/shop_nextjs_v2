import { DateStatusResultJson } from "@/types/Component";
import {
	PromotionDiscountType,
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

	// Get all promotions that are valid
	static getPromotionStatusValid(item: PromotionJson, timeNow: number) {
		try {
			const { start_date, end_date } = item;
			const startDate = Number(start_date);
			const endDate = Number(end_date);
			if (!item.status) return PromotionStatus.INVALID;

			if (isNaN(startDate) || isNaN(endDate)) {
				return PromotionStatus.INVALID;
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
		} catch (error) {
			return PromotionStatus.INVALID;
		}
	}

	// Get all promotions that are coupon
	static getPromotionCoupon(items: PromotionJson[]) {
		return items.filter((i) => i.group === PromotionGroup.coupon);
	}

	// Get all promotions that are seasonal
	static getPromotionSeasonal(items: PromotionJson[]) {
		return items.filter((i) => i.group === PromotionGroup.seasonal);
	}

	// Get all promotions that are invoice
	static getPromotionEffectOnCart(items: PromotionJson[]) {
		return items.filter((i) => i.discount_type === PromotionDiscountType.CART);
	}

	// Get all promotions that are product
	static getPromotionEffectOnProduct(items: PromotionJson[]) {
		return items.filter(
			(i) => i.discount_type === PromotionDiscountType.PRODUCT
		);
	}

	//////////////////////////////////////////////////////////////////////////
	// Check if the current server time is within the active date range
	static getPromotionDateStatus(
		startDate: number,
		endDate: number,
		currentTime: number
	): DateStatusResultJson {
		const msPerDay = 24 * 60 * 60;
		currentTime = currentTime ?? Date.now() / 1000;
		if (currentTime < startDate) {
			return {
				status: "waiting",
				remainingDays: Math.ceil((startDate - currentTime) / msPerDay),
			};
		}

		if (currentTime > endDate) {
			return {
				status: "expired",
				remainingDays: 0,
			};
		}

		return {
			status: "running",
			remainingDays: Math.ceil((endDate - currentTime) / msPerDay),
		};
	}

	// Utilize

	static groupPromotionCouponByCode(
		promotions: PromotionJson[]
	): Record<string, PromotionJson[]> {
		return promotions.reduce((acc, promo) => {
			if (promo.codes && promo.codes.length > 0) {
				promo.codes.forEach((code) => {
					if (!acc[code.code]) {
						acc[code.code] = [];
					}
					acc[code.code].push(promo);
				});
			}
			return acc;
		}, {} as Record<string, PromotionJson[]>);
	}
}
export default PromotionModel;
