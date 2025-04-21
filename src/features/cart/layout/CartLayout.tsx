import { Button, Flex, Text } from "@/components/ui";
import CartHeading from "../head/CartHeading";
import CartInfor from "../infor/CartInfor";
import { CartList } from "../list";
import { CartProps } from "@/types/Cart.type";
import CartLayoutSection from "./CartLayoutSection";
import CartCoupon from "../promotion/CartCoupon";
import { useEffect } from "react";

type Props = CartProps & {};
export default function CartLayout({ cart }: Props) {
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
