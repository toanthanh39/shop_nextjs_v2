import { notFound } from "next/navigation";

import { CartItemPrice } from "@/features/cart/list";
import InvoiceRepo from "@/services/api/repositories/InvoiceRepo";

import { CustomImage, Flex, LinkElement, Money, Text } from "@/components/ui";
import Heading from "@/components/ui/Heading";

import CartCalculator from "@/services/utils/CartCalculator";


const getInvoiceServer = async (token: string) => {
	const InvoiceInstance = InvoiceRepo.getInstance({
		accessMode: "PUBLIC",
	});
	try {
		const invoice = await InvoiceInstance.getOne(token);
		return invoice;
	} catch (error) {
		notFound();
	}
};
export default async function Page({
	params,
}: {
	params: Promise<{ token: string }>;
}) {
	const { token } = await params;
	const invoice = await getInvoiceServer(token);
	const { details } = invoice;
	const priceInfor = CartCalculator.getPriceInfor(invoice);

	return (
		<section className="max-w-3xl mx-auto p-6">
			<Heading level={1} className="text-center text-2xl font-bold mb-4">
				Đặt hàng thành công
			</Heading>
			<Text className="text-left mb-6">
				Cảm ơn bạn đã mua hàng tại{" "}
				<Text as="span" variant="primary" className="font-bold">
					namperfume
				</Text>
				. Mã đơn hàng của bạn là{" "}
				<Text as="span" className="font-bold">
					{invoice.code}
				</Text>
				. Chúng tôi đã nhận được đơn đặt hàng và sẽ gửi cho bạn trong thời gian
				sớm nhất. Mời bạn theo dõi đơn hàng{" "}
				<a href="#" className="text-blue-500">
					tại đây
				</a>
				.
			</Text>
			<div className="relative bg-colors-gray-2 p-4 rounded-lg shadow-md">
				<Flex vertical gap={4}>
					{details.data.map((item) => {
						const { product_json } = item;
						return (
							<Flex
								key={item.id}
								gap={16}
								className="border border-colors-gray-4 rounded-md p-4">
								<CustomImage
									src={product_json.images?.[0].url ?? ""}
									alt="Product Image"
									width={80}
									height={80}
									className="rounded-md"
								/>

								<Flex vertical gap={2}>
									<Heading level={3} size="h4" className="font-bold">
										{product_json.brand.title}
									</Heading>
									<Text className="text-sm">{product_json.name}</Text>
									<Text size="sm">{product_json.option_name}</Text>
								</Flex>

								<Flex vertical>
									<CartItemPrice item={item} />
								</Flex>
							</Flex>
						);
					})}
				</Flex>
				<Flex vertical align="end" className="mt-4">
					<Flex vertical gap={16} className="w-1/2">
						<Flex align="center" justify="between">
							<Text size="sm">Số lượng sản phẩm:</Text>
							<Text as="span" size="sm">
								{invoice.quantity}
							</Text>
						</Flex>
						<Flex align="center" justify="between">
							<Text size="sm">Tổng tiền hàng:</Text>

							<Money
								variant="default"
								weight="default"
								value={invoice.price_sell}></Money>
						</Flex>
						<Flex align="center" justify="between">
							<Text size="sm">Phí vận chuyển:</Text>
							<Text as="span" size="sm">
								Miễn phí
							</Text>
						</Flex>
						<hr className="border-t-2 border-colors-gray-3 w-full" />
						<Flex align="center" justify="between">
							<Text variant="primary" size="sm">
								Tiết kiệm:
							</Text>
							<Money
								variant="primary"
								value={
									priceInfor.productDiscount + priceInfor.promotionDiscount
								}></Money>
						</Flex>
						<Flex align="center" justify="between">
							<Text weight="bold" size="sm">
								Tổng thanh toán:
							</Text>
							<Money value={invoice.price_final}></Money>
						</Flex>
					</Flex>
				</Flex>
			</div>
			<Flex justify="center" className="mt-6">
				<LinkElement
					variant="none"
					href="/"
					className="bg-red-500 text-white py-2 px-4 rounded-md mr-2">
					Tiếp tục mua hàng
				</LinkElement>
				<button className="bg-white border border-red-500 text-red-500 py-2 px-4 rounded-md">
					Liên hệ hỗ trợ
				</button>
			</Flex>
		</section>
	);
}
