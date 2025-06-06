"use client";

import dynamic from "next/dynamic";

import YoutubeListSkeleton, {
	YoutubeSkeletonType,
} from "@/features/channels/youtube/YoutubeListSkeleton";
import { BrandJson } from "@/types/Brand.type";
import { ComProps , ComDataSource } from "@/types/Component";

import { cn } from "@/utils/utils";



import NmagazineCard from "./NmagazineCard";

const SliderDynamic = dynamic(
	() =>
		import("@/components/widgets/Slider").then((mod) => ({
			default: mod.default,
		})),
	{
		ssr: false,
		loading(loadingProps) {
			return (
				<YoutubeListSkeleton
					className="mb-2 md:mb-4 relative block"
					type={YoutubeSkeletonType.list}
				/>
			);
		},
	}
);
type Props = ComProps & ComDataSource<BrandJson> & {};
export default function NamgazineSlider({ dataSource, className }: Props) {
	const render = (data: BrandJson) => {
		return <NmagazineCard key={data.id} data={data}></NmagazineCard>;
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
					1024: {
						slidesPerView: 4,
						spaceBetween: 12,
					},

					768: {
						slidesPerView: 4,
						spaceBetween: 12,
					},

					414: {
						slidesPerView: 2,
						spaceBetween: 12,
						centeredSlides: true,
						centeredSlidesBounds: true,
					},
					1: {
						slidesPerView: 2,
						spaceBetween: 0,
						centeredSlides: true,
						centeredSlidesBounds: true,
					},
				}}
			/>
		</aside>
	);
}
