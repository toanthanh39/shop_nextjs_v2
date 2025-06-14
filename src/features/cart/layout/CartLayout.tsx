import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import BaseApi from "@/lib/axios/BaseApi";
import messages from "@/lib/i18n/messages/vi";
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
	const { data: session } = useSession();
	const { addPromotionToCart, isUpdating } = useCartGlobal({});
	const t = useTranslations("cart");
	const tCartError = useTranslations("cart.cart_errors");

	//////////////////////////////////////////////////
	const handleChangePromotionCart = async (
		pro: PromotionJson,
		type: PromotionToggleProps
	) => {
		try {
			await addPromotionToCart({
				action: type,
				data: {
					promotions: [pro],
				},
			});
		} catch (error) {
			const errorKey =
				BaseApi.handleError(error).errors?.[0] ||
				("unknown_error" as keyof typeof messages.cart.cart_errors);
			toast.error(tCartError(errorKey, { count: 123 }));
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
						{session ? (
							<>
								<Text>
									{/* {t.rich("cart_infor.authenticated.heading", {
										// "heading" vì t đã được gọi với "cart_infor.authenticated"
										guidelines: (chunks) => <strong>{chunks}</strong>,
										name: session.user.user.full_name,
									})} */}
									{t.rich("cart_infor.authenticated.heading", {
										guidelines: (chunks) => <strong>{chunks}</strong>,
										name: session.user.user.full_name,
									})}
								</Text>
							</>
						) : (
							<>
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
							</>
						)}
					</CartLayoutSection>
					<CartLayoutSection className="flex-1 p-0">
						<CartList cart={cart}></CartList>
					</CartLayoutSection>
				</Flex>
				<Flex direction="col" gap={16} className="basis-[400px]">
					<CartPromoSeasonal
						isLoading={isUpdating}
						layout={CartLayoutSection}
						cart={cart}
						onChange={handleChangePromotionCart}
					/>

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
