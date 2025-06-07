"use client";

import { BannerHomeData } from "@/types/Home.type";

import CustomImage from "@/components/ui/CustomImage";
import LinkElement from "@/components/ui/Link";

import { imageConst } from "@/common/constants/image";


type Props = {
	data: BannerHomeData;
};
export default function BannerItem({ data }: Props) {
	return (
		<LinkElement
			className="block"
			href={data.link}
			key={data.id}
			prefetch={true}>
			{/* <picture>
				<source
					media="(max-width:767px)"
					srcSet={data.image_mobile + "?format=webp"}
					type="image/webp"
				/>

				<source
					media="(min-width:767px)"
					srcSet={data.image + "?format=webp"}
					type="image/webp"
				/>

			
			</picture> */}
			<CustomImage
				className=" md:hidden"
				alt={data.alt}
				src={data.image_mobile}
				loading="eager"
				height={414}
				width={414}
				layout="responsive"
				placeholder="blur"
				priority
				blurDataURL={imageConst.blur_url}></CustomImage>
			<CustomImage
				className="hidden md:block"
				alt={data.alt}
				src={data.image}
				loading="eager"
				height={52}
				width={100}
				placeholder="blur"
				priority
				blurDataURL={imageConst.blur_url}
				layout="responsive"></CustomImage>
		</LinkElement>
	);
}
