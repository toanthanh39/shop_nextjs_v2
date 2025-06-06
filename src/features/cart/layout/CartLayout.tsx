import { CartProps } from "@/types/Cart.type";
import { PromotionJson, PromotionToggleProps } from "@/types/Promotion.type";

import { Button, Flex, Text } from "@/components/ui";

import useCartGlobal from "@/lib/hooks/cache/useCartGlobal";

import CartHeading from "../head/CartHeading";
import CartInfor from "../infor/CartInfor";
import { CartList } from "../list";
import { CartPromoSeasonal } from "../promotion";
import CartCoupon from "../promotion/CartCoupon";

import CartLayoutSection from "./CartLayoutSection";

type Props = CartProps & {};
export default function CartLayout({ cart }: Props) {
	const { addPromotionToCart } = useCartGlobal({});

	//////////////////////////////////////////////////
	const handleChangePromotionCart = async (
		pro: PromotionJson,
		type: PromotionToggleProps
	) => {
		console.log("🚀 ~ CartLayout ~ type:", type);
		try {
			await addPromotionToCart({
				action: type,
				data: {
					promotions: [pro],
				},
			});
		} catch (error) {
			console.log("🚀 ~ CartLayout ~ error:", error);
		}
	};

	//////////////////////////////////////////////////

	return (
		<Flex direction="col" gap={16}>
			<CartLayoutSection className=" shadow-none p-0">
				<CartHeading cart={cart} />
			</CartLayoutSection>

			<Flex gap={16} className="max-lg:flex-col">
				<Flex direction="col" gap={16}>
					<CartLayoutSection className="p-4 flex justify-between items-center gap-2 shadow-none bg-colors-gray-2">
						<Text>
							Beauty Insiders enjoy{" "}
							<Text as="span" weight="bold">
								FREE Standard Shipping
							</Text>{" "}
							on all orders.
						</Text>
						<Button variant="secondary" size="sm">
							Login
						</Button>
					</CartLayoutSection>
					<CartLayoutSection className="flex-1 p-0">
						<CartList cart={cart}></CartList>
					</CartLayoutSection>
				</Flex>
				<Flex direction="col" gap={16} className="basis-[400px]">
					<CartLayoutSection>
						<CartPromoSeasonal
							cart={cart}
							onChange={handleChangePromotionCart}
						/>
					</CartLayoutSection>

					<CartLayoutSection>
						<CartCoupon cart={cart} />
					</CartLayoutSection>
					<CartLayoutSection>
						<CartInfor cart={cart}></CartInfor>
					</CartLayoutSection>
				</Flex>
			</Flex>
		</Flex>
	);
}
