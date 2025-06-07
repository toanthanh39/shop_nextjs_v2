"use client";

// import Slider from "@/components/widgets/Slider";
import dynamic from "next/dynamic";
import { useState } from "react";

import { ComProps } from "@/types/Component";
import { ProductJson } from "@/types/Product.type";

import Popup from "@/components/composite/Popup";

import { cn } from "@/utils/utils";

import { ProductQuickView } from "../infor";

import ProductCard from "./ProductCard";
import ProductListSkeleton, {
	ProductSkeletonType,
} from "./ProductListSkeleton";



const SliderDynamic = dynamic(
	() =>
		import("@/components/widgets/Slider").then((mod) => ({
			default: mod.default,
		})),
	{
		ssr: false,
		loading(loadingProps) {
			return (
				<ProductListSkeleton
					className="mb-2 md:mb-4 relative block"
					type={ProductSkeletonType.list}
				/>
			);
		},
	}
);
type Props = ComProps & {
	dataSource: ProductJson[];
};
export default function ProductSlider({ dataSource, className }: Props) {
	const [productQuickView, setProductQuickView] = useState<
		ProductJson | undefined
	>(undefined);

	const render = (product: ProductJson) => {
		return (
			<ProductCard
				key={product.id}
				product={product}
				onQuickView={onOpenQuickView}
			/>
		);
	};

	/////////////////////////////////////

	const onOpenQuickView = (p: ProductJson) => {
		setProductQuickView(p);
	};

	const onCloseQuickView = () => {
		setProductQuickView(undefined);
	};

	return (
		<aside className={cn("", className)}>
			<SliderDynamic
				className="p-c-init"
				useAnimation
				dataSource={dataSource}
				render={render}
				pagination={false}
				slidesPerView={6}
				updateOnWindowResize={true}
				freeMode={true}
				watchOverflow={false}
				breakpoints={{
					1220: {
						slidesPerView: 6,
						spaceBetween: 16,
					},

					768: {
						slidesPerView: 4,
						spaceBetween: 16,
					},

					414: {
						slidesPerView: 2,
						spaceBetween: 0,
						centeredSlides: true,
						centeredSlidesBounds: true,
					},
					1: {
						slidesPerView: 1.8,
						spaceBetween: 0,
						centeredSlides: true,
						centeredSlidesBounds: true,
					},
				}}
			/>
			<Popup
				open={!!productQuickView}
				onOpenChange={onCloseQuickView}
				className="max-lg:hidden h-fit min-h-100  w-200">
				{productQuickView && (
					<ProductQuickView product={productQuickView}></ProductQuickView>
				)}
			</Popup>
		</aside>
	);
}
