import { Flex, Money, Text } from "@/components/ui";
import { CartItemProps } from "@/types/Cart.type";
import { OrderItemJson } from "@/types/Order.type";
import { cn } from "@/utils/utils";
import { useMemo } from "react";

type Props = CartItemProps & {
	isNotWithQuantity?: boolean;
};
export default function CartItemPrice({
	item,
	isNotWithQuantity = true,
	className,
}: Props) {
	const infor = useMemo(() => {
		const quantity = isNotWithQuantity ? 1 : item.item_quantity;
		const { price_discount, item_quantity, price_unit_final, product_json } =
			item;
		const { compare_at_price: compareAtPrice, price } = product_json;

		const discountPerItem = price_discount / item_quantity;
		const priceUnitFinalPerItem = price_unit_final / item_quantity;

		const finalPricePerItem = discountPerItem ? priceUnitFinalPerItem : price;
		const totalFinalPrice = finalPricePerItem * quantity;

		const totalComparePrice = (() => {
			if (compareAtPrice <= 0 && discountPerItem > 0) return price * quantity;
			if (compareAtPrice <= price) return 0;
			return compareAtPrice * quantity;
		})();

		const discountPercent = (() => {
			const initialComparePrice = totalComparePrice / quantity;
			if (initialComparePrice > 0) {
				return initialComparePrice <= finalPricePerItem
					? 0
					: ((initialComparePrice - finalPricePerItem) / initialComparePrice) *
							100;
			}
			return price <= finalPricePerItem
				? 0
				: ((price - finalPricePerItem) / price) * 100;
		})();

		return {
			priceFinal: totalFinalPrice,
			priceCompare: totalComparePrice,
			percent: Math.round(discountPercent),
		};
	}, [item, isNotWithQuantity]);

	return (
		<Flex direction="col" gap={4} className={cn(className)}>
			<Flex gap={4} align="center">
				{infor.priceCompare > 0 && (
					<Money
						variant="secondary"
						className="line-through"
						value={infor.priceCompare}
					/>
				)}
				{infor.percent > 0 && <Text.small>-{infor.percent}%</Text.small>}
			</Flex>

			{infor.priceFinal && <Money variant="primary" value={infor.priceFinal} />}
		</Flex>
	);
}
