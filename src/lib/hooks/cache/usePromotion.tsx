import BaseApi from "@/lib/axios/BaseApi";
import { HookCacheProps } from "@/types/Component";
import { useQuery } from "@tanstack/react-query";
import PromotionRepo from "@/services/api/repositories/PromotionRepo";
import { PromotionFilter } from "@/types/Promotion.type";
import PromotionModel from "@/common/models/PromotionModel";

const STALE_TIME = 60 * 1000;
export const CACHE_PROMOTIONS_HOOK = "cache-promotions";
type Props = HookCacheProps & {
	filters?: PromotionFilter;
};
function usePromotion({ staleTime, enabled = true }: Props) {
	return useQuery({
		queryKey: [CACHE_PROMOTIONS_HOOK],
		queryFn: async () => {
			try {
				const promotions = (await new PromotionRepo().getAll({})).items;
				const promotionsValid =
					PromotionModel.getListPromotionValid(promotions);
				const promotionCoupons =
					PromotionModel.getPromotionCoupon(promotionsValid);

				// Lấy mã code của từng promotion loại coupon và đưa vào json

				let getCouponPromises: any[] = [];
				for (let index = 0; index < promotionCoupons.length; index++) {
					const pro = promotionCoupons[index];
					getCouponPromises.push(
						new PromotionRepo().getAllCouponCodeOfPromotion(pro.id)
					);
				}

				let enhancedPromotions = promotionsValid;
				try {
					const results = await Promise.allSettled(getCouponPromises);
					enhancedPromotions = promotionsValid.map((promotion, index) => {
						const couponResult = results[index];
						return {
							...promotion,
							codes:
								couponResult.status === "fulfilled"
									? couponResult.value?.items
									: [],
						};
					});
				} catch (error) {
				} finally {
					return enhancedPromotions;
				}
			} catch (error) {
				throw BaseApi.handleError(error);
			}
		},
		staleTime: staleTime ?? STALE_TIME,
		enabled: enabled,
	});
}

export default usePromotion;
