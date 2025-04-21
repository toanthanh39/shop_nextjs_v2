import PromotionModel from "@/common/models/PromotionModel";
import Flex from "@/components/ui/Flex";
import Money, { MoneyProps } from "@/components/ui/Money";
import Text from "@/components/ui/Text";
import { ComProps } from "@/types/Component";
import { ProductJson } from "@/types/Product.type";
import { PromotionGroup } from "@/types/Promotion.type";
import { cn } from "@/utils/utils";

type Props = ComProps &
	Pick<MoneyProps, "variant"> & {
		product: ProductJson;
		showPriceCompare?: boolean;
		showPercentDiscount?: boolean;
	};
export default function ProductPrice({
	product,
	variant,
	showPriceCompare = false,
	showPercentDiscount = false,
	className,
}: Props) {
	const promotionSeasonals = PromotionModel.getListPromotionValid(
		product.promotions.filter((p) => p.group === PromotionGroup.seasonal)
	);

	if (promotionSeasonals.length > 0) {
		const promoSeasonal = promotionSeasonals[0]; // Verion 1 chỉ xử lý cho promo đầu tiên valid
		return (
			<Flex direction="col" gap={2} className={cn(className)}>
				{showPriceCompare &&
					product.compare_at_price > promoSeasonal.promotion_price && (
						<Flex gap={4}>
							<Money
								weight="default"
								variant="default"
								value={product.compare_at_price}
								className="line-through"></Money>
							{showPercentDiscount &&
								promoSeasonal.compare_discount_percent && (
									<Text as="span" size="sm">
										(Tiết kệm{" "}
										{Math.round(promoSeasonal.compare_discount_percent * 10) /
											10}
										%)
									</Text>
								)}
						</Flex>
					)}
				<Money
					size="lg"
					value={promoSeasonal.promotion_price}
					variant={variant}
				/>
			</Flex>
		);
	}
	return (
		<Flex direction="col" gap={2} className={cn(className)}>
			{showPriceCompare && product.compare_at_price > product.price && (
				<Flex gap={4}>
					<Money
						weight="default"
						variant="default"
						value={product.compare_at_price}
						className="line-through"></Money>
					{showPercentDiscount && product.compare_discount_percent && (
						<Text as="span" size="sm">
							(Tiết kệm {Math.round(product.compare_discount_percent * 10) / 10}
							%)
						</Text>
					)}
				</Flex>
			)}
			<Money size="lg" value={product.price} variant={variant} />
		</Flex>
	);
}
