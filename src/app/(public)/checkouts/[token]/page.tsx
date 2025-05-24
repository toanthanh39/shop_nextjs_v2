import Heading from "@/components/ui/Heading";
import CheckoutForm from "@/features/checkout/form/CheckoutForm";
import { Params } from "@/types/Dynamic.type";
import CartRepo from "@/services/api/repositories/CartRepo";
import { notFound } from "next/navigation";
import ServerRepo from "@/services/api/repositories/ServerRepo";

const getDetailOrder = async (token: string) => {
	try {
		const customerToken = await ServerRepo.getCustomerTokenServer();
		const cart = await new CartRepo({
			accessMode: "PUBLIC",
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
