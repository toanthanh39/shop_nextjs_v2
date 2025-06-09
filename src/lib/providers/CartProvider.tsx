import React from "react";

import PromotionModel from "@/common/models/PromotionModel";
import { IsUse } from "@/types/Global.type";
import { RootProviderProps } from "@/types/Shop.type";

import useCartGlobal from "../hooks/cache/useCartGlobal";
import usePromotion from "../hooks/cache/usePromotion";

type Props = RootProviderProps & {};
export default function CartProvider({ children }: Props) {
	const { data: fullPromotion } = usePromotion({});
	const { cart, addPromotionToCart } = useCartGlobal({});

	/////////////////////////////////////////////////////////////
	// Get all promotions that are active and not expired
	const promoSeasonalCarts = PromotionModel.getPromotionEffectOnCart(
		PromotionModel.getPromotionSeasonal(fullPromotion ?? [])
	);

	// Phase 1 - Auto Add one of promotions (seasonal) to cart
	React.useEffect(() => {
		if (cart && promoSeasonalCarts.length === 1) {
			// Check if the cart already has a promotion applied
			const hasPromotion = cart.promotions.some((promo) =>
				promoSeasonalCarts.some(
					(seasonal) =>
						seasonal.id === promo.promotion_id && promo.is_use === IsUse.USE
				)
			);
			// If not, add the promotion to the cart
			// !hasPromotion &&
			// 	addPromotionToCart({
			// 		action: "aplly ",
			// 		data: {
			// 			promotions: promoSeasonalCarts,
			// 		},
			// 	});
		}
	}, [promoSeasonalCarts.length, cart?.price_final]);

	return <>{children}</>;
}
