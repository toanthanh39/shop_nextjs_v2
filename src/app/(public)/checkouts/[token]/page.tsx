import { notFound } from "next/navigation";

import CheckoutForm from "@/features/checkout/form/CheckoutForm";
import CartRepo from "@/services/api/repositories/CartRepo";
import ServerRepo from "@/services/api/repositories/ServerRepo";
import { Params } from "@/types/Dynamic.type";

import Heading from "@/components/ui/Heading";
import { auth } from "@/lib/next-authen/authenOption";

const getDetailOrder = async (token: string) => {
	try {
		const session = await auth();
		const customerToken = await ServerRepo.getCustomerTokenServer();
		const cart = await new CartRepo({
			accessMode: session ? "PRIVATE" : "PUBLIC",
		}).getOne(token, {
			customer_token: customerToken,
		});
		return cart;
	} catch (error) {
		console.log("🚀 ~ getDetailOrder ~ error:", error);
		notFound();
	}
};
export default async function Page({ params }: Params<{ token: string }>) {
	const token = (await params).token;
	const cart = await getDetailOrder(token);
	return (
		<>
			<Heading level={1}>Thanh toán</Heading>
			<CheckoutForm order={cart} />
		</>
	);
}
