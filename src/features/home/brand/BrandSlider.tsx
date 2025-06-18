"use client";

import dynamic from "next/dynamic";

import { ComProps, ComDataSource } from "@/types/Component";
import { BrandHomeData } from "@/types/Home.type";

import CustomImage from "@/components/ui/CustomImage";
import LinkElement from "@/components/ui/Link";
const SliderDynamic = dynamic(
	() =>
		import("@/components/widgets/Slider").then((mod) => ({
			default: mod.default,
		})),
	{
		ssr: false,

		loading(loadingProps) {
			return (
				<CustomImage
					src=""
					alt="placeholder"
					layout="responsive"
					width={61.5}
					height={29}
					loading="eager"
					className="max-h-[290px]"
				/>
			);
		},
	}
);

import { cn } from "@/utils/utils";
import { Skeleton } from "@/components/ui";

type Props = ComDataSource<BrandHomeData> & ComProps & {};
export default function BrandSlider({ dataSource, className }: Props) {
	const render = (item: BrandHomeData) => {
		return (
			<LinkElement key={item.id} href={item.link} prefetch={true}>
				<CustomImage
					className="h-full "
					src={item.image}
					width={item.width}
					height={item.height}
					loading="eager"
					alt={item.alt}
					priority
					layout="responsive"></CustomImage>
			</LinkElement>
		);
	};
	return (
		<div className={cn("", className)}>
			<SliderDynamic
				dataSource={dataSource}
				render={render}
				slidesPerView={1}
				pagination={false}
				autoplay={true}
			/>
		</div>
	);
}
