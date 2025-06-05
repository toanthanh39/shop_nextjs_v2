import { productConst } from "@/common/constants/product";
import Rating from "@/components/composite/Rating";
import { HeartIcon } from "@/components/icons";
import { Button, Flex } from "@/components/ui";
import { Card, CardBagde, CardContent, CardImage } from "@/components/ui/Card";
import LinkElement from "@/components/ui/Link";
import Money from "@/components/ui/Money";
import Text from "@/components/ui/Text";
import { ProductJson } from "@/types/Product.type";
import ProductTags from "./ProductTags";

type Props = {
	product: ProductJson;
	onQuickView?: (product: ProductJson) => void;
};
export default function ProductCard({ product, onQuickView }: Props) {
	const { tags } = product;

	return (
		<Card className="group max-w-[450px] min-h-[328px] lg:min-h-[280px] max-md:px-3 max-md:pt-5 max-md:pb-3 max-sm:border max-sm:border-gray-200 ">
			<CardImage
				alt={product.name}
				src={product.images?.[0]?.url ?? ""}
				height={productConst.image.card_image_mobile}
				width={productConst.image.card_image_mobile}></CardImage>
			<CardContent>
				<Flex direction="col" gap={4}>
					<LinkElement
						className="uppercase"
						weight="bold"
						variant="default"
						size="sm"
						href={`/blogs/thuong-hieu-nuoc-hoa/${product.brand?.handle}`}>
						{product.brand?.title}
					</LinkElement>

					<LinkElement
						href={"/products/" + product.handle}
						variant="default"
						size="sm"
						prefetch={true}
						title={product.full_name}
						className="line-clamp-2 min-h-[35px]">
						{product.full_name}
					</LinkElement>

					<Flex gap={4} align="center">
						<Rating rate={product.rate.rate} />

						{/* <Tag size="xs">{product.rate.count_rate} reviews</Tag> */}
					</Flex>
					<Flex align="center" gap={4}>
						<Money variant="primary" value={product.price}></Money>
						{product.compare_at_price > product.price && (
							<>
								<Text as="span" variant="primary">
									-
								</Text>
								<Money
									variant="primary"
									value={product.compare_at_price}></Money>
							</>
						)}
					</Flex>
					{/* <AddToCart product={product} size="sm"></AddToCart> */}
				</Flex>
			</CardContent>

			<CardBagde position="top_left" className="ml-3 mt-3">
				<ProductTags product={product}></ProductTags>
			</CardBagde>

			<CardBagde position="top_right" className="mr-3 mt-2.5">
				<HeartIcon />
			</CardBagde>

			<CardBagde
				position="center"
				className="hidden -translate-y-4 opacity-0 lg:group-hover:block lg:group-hover:opacity-1 w-full px-3 duration-300 animate-fade">
				<Button
					onClick={() => onQuickView?.(product)}
					variant="primary"
					size={"sm"}
					className="hidden lg:block w-full">
					Xem nhanh
				</Button>
			</CardBagde>
		</Card>
	);
}
