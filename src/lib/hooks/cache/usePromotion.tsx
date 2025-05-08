import BaseApi from "@/lib/axios/BaseApi";
import { HookCacheProps } from "@/types/Component";
import { useQuery } from "@tanstack/react-query";
import PromotionRepo from "@/services/api/repositories/PromotionRepo";
import { PromotionFilter } from "@/types/Promotion.type";
import PromotionModel from "@/common/models/PromotionModel";
import SettingRepo from "@/services/api/repositories/SettingRepo";

const STALE_TIME = 10 * 1000;
export const CACHE_PROMOTIONS_HOOK = "cache-promotions";
type Props = HookCacheProps & {
	filters?: PromotionFilter;
};
function usePromotion({ staleTime, enabled = true }: Props) {
	const settingInstance = new SettingRepo();

	return useQuery({
		queryKey: [CACHE_PROMOTIONS_HOOK],
		queryFn: async () => {
			try {
				const { time_server } = await settingInstance.getTimeServer();
				const promotions = (await new PromotionRepo().getAll({})).items;

				// Lọc ra các promotion còn hiệu lực
				const promotionsValid = PromotionModel.getListPromotionValid(
					promotions,
					time_server
				);
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
				// Lấy mã code của từng promotion loại coupon và đưa vào json
				let enhancedPromotions = promotionsValid;
				try {
					const results = await Promise.allSettled(getCouponPromises);
					enhancedPromotions = promotionsValid.map((promotion, index) => {
						const couponResult = results[index];
						console.log(
							"🚀 ~ enhancedPromotions=promotionsValid.map ~ couponResult:",
							couponResult
						);

						return {
							...promotion,
							codes:
								couponResult?.status === "fulfilled"
									? couponResult.value?.items
									: [],
						};
					});
				} catch (error) {
					console.log("🚀 ~ queryFn: ~ error:", error);
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
