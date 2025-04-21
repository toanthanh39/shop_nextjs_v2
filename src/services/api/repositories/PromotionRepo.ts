import { BaseCollectionJson } from "@/types/Base.type";
import BaseRepository from "./BaseRepository";
import Helper from "@/utils/helper";
import client from "@/lib/core/client";
import { PromotionFilter, PromotionJson } from "@/types/Promotion.type";
import { CouponJson } from "@/types/Coupon.type";

class PromotionRepo extends BaseRepository<PromotionJson> {
	private static instance: PromotionRepo;
	public static getInstance(): PromotionRepo {
		if (!PromotionRepo.instance) {
			PromotionRepo.instance = new PromotionRepo();
		}
		return PromotionRepo.instance;
	}
	private readonly pathname = "/promotions/public";
	private readonly pathnameCodeCoupon = "/promotioncoupons/public";

	async getAll(filter: PromotionFilter) {
		return client.get<BaseCollectionJson<PromotionJson>>(this.pathname, {
			params: Helper.convertParams(filter),
		});
	}

	async getOne(id: number | string) {
		return client.get<PromotionJson>(this.pathname + "/" + id);
	}

	async getAllCouponCodeOfPromotion(promotion_id: number | string) {
		return client.get<BaseCollectionJson<CouponJson>>(this.pathnameCodeCoupon, {
			params: Helper.convertParams({ promotion_id }),
		});
	}
}

export default PromotionRepo;
