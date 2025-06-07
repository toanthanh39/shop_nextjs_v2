"use client";

import dynamic from "next/dynamic";

import { ComProps , ComDataSource } from "@/types/Component";
import { VideoJson } from "@/types/Video.type";

import { cn } from "@/utils/utils";


import YoutubeCard from "./YoutubeCard";
import YoutubeListSkeleton, {
	YoutubeSkeletonType,
} from "./YoutubeListSkeleton";
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
type Props = ComProps & ComDataSource<VideoJson> & {};
export default function YoutubeSlider({ dataSource, className }: Props) {
	const render = (video: VideoJson) => {
		return <YoutubeCard key={video.video_id} video={video}></YoutubeCard>;
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
						spaceBetween: 12,
						centeredSlides: true,
						centeredSlidesBounds: true,
					},
				}}
			/>
		</aside>
	);
}
