import { ComProps } from "@/types/Component";
import { ProductJson } from "@/types/Product.type";
import { cn } from "@/utils/utils";
import { useState } from "react";
import ProductPrice from "./ProductPrice";
import {
	Button,
	CustomImage,
	Flex,
	Label,
	LinkElement,
	Tag,
	Text,
} from "@/components/ui";
import useProductVariantTag from "@/lib/hooks/cache/useProductVariantTag";
import ProductListTagVariant from "../list/ProductListTagVariant";
import { LoadingIcon } from "@/components/icons";
import Rating from "@/components/composite/Rating";
import AddToCart from "../action/AddToCart";
import QuantityBtn from "../action/QuantityBtn";
import ProductGender from "./ProductGender";
import useCartGlobal from "@/lib/hooks/cache/useCartGlobal";
import useCartStore from "@/lib/zustand/useCartStore";

type Props = ComProps & {
	product: ProductJson;
};
export default function ProductQuickView(props: Props) {
	const { product } = props;

	const { data: variantTags, isLoading } = useProductVariantTag({ product });
	const isAdding = useCartStore((state) => state.isLoading);

	////////////////////////////////////////
	const [quantity, setQuantity] = useState(1);
	const [variantActive, setVariantActive] = useState<ProductJson>(product);

	////////////////////////////////////////
	const handleIncrease = () => setQuantity(quantity + 1);
	const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

	if (isLoading)
		return (
			<>
				<LoadingIcon></LoadingIcon>
			</>
		);
	return (
		<Flex className=" bg-white overflow-hidden" gap={32}>
			{/* Hình ảnh sản phẩm */}
			<Flex direction="col" gap={4} className="w-fit">
				<CustomImage
					src={variantActive.images?.[0]?.url ?? ""}
					alt={variantActive.name}
					width={200}
					height={200}
				/>

				<Rating
					rate={variantActive.rate.rate}
					count={product.rate.count_rate}></Rating>
			</Flex>
			{/* Nội dung sản phẩm */}
			<Flex direction="col" gap={16} className="flex-1">
				<Flex direction="col" gap={4}>
					<Text.p size="lg" weight="semibold">
						{product.name}
					</Text.p>

					<Text.p>
						Thương hiệu:{" "}
						<Text as="span" weight="bold">
							{product.brand.title}
						</Text>
					</Text.p>
					<Flex gap={4}>
						<Text.p className="shrink-0">{variantActive.option_name} </Text.p>
						<ProductGender product={variantActive} />
					</Flex>
					<Text.p>
						Mã hàng:{" "}
						<Text as="span" weight="bold">
							{" "}
							{variantActive.sku}
						</Text>
					</Text.p>
					<LinkElement
						href={"/products/" + variantActive.handle}
						variant="link">
						Xem chi tiết
					</LinkElement>
				</Flex>
				{variantTags && (
					<ProductListTagVariant
						dataSource={variantTags}
						onSelect={(v) => setVariantActive(v)}
						variantActive={variantActive}></ProductListTagVariant>
				)}

				<Flex gap={8} className="mt-4">
					<ProductPrice
						variant="primary"
						product={variantActive}
						showPercentDiscount={true}
						showPriceCompare={true}
					/>
					<Flex direction="col" align="end" gap={4} className="w-full">
						<QuantityBtn
							className="justify-end"
							product={variantActive}
							quantity={quantity}
							disabled={isAdding}
							onDeCrease={handleDecrease}
							onInCrease={handleIncrease}
						/>
						<Button variant="primary" className="flex-1 w-full max-w-40">
							Mua ngay
						</Button>
						<AddToCart
							product={variantActive}
							quantity={quantity}
							className="flex-1 w-full max-w-40"></AddToCart>

						<Text as="span">
							<strong> Free ship</strong> mọi đơn hàng
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}
