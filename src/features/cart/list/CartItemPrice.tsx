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
		const discount = price_discount / item_quantity;

		const calculateFinalPrice = discount ? price_unit_final : price;
		const dataFinal = calculateFinalPrice * quantity;

		const calculateComparePrice = () => {
			if (compareAtPrice <= 0 && discount > 0) return price;
			if (compareAtPrice <= price) return 0;
			return compareAtPrice;
		};
		const dataCompare = calculateComparePrice() * quantity;

		const calculatePercent = () => {
			const compareInit = dataCompare / quantity;
			const finalPrice = dataFinal;

			if (compareInit > 0) {
				return compareInit <= finalPrice
					? 0
					: ((compareInit - finalPrice) / compareInit) * 100;
			}

			return price <= finalPrice ? 0 : ((price - finalPrice) / price) * 100;
		};
		const dataPercent = calculatePercent();

		return {
			priceFinal: dataFinal,
			priceCompare: dataCompare,
			percent: Math.round(dataPercent),
		};
	}, [item]);

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
