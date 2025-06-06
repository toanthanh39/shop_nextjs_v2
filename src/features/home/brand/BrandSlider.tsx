"use client";

import { ComProps , ComDataSource } from "@/types/Component";
import { BrandHomeData } from "@/types/Home.type";

import CustomImage from "@/components/ui/CustomImage";
import LinkElement from "@/components/ui/Link";
import Slider from "@/components/widgets/Slider";


import { cn } from "@/utils/utils";

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
			<Slider
				dataSource={dataSource}
				render={render}
				slidesPerView={1}
				pagination={false}
				autoplay={true}
			/>
		</div>
	);
}
