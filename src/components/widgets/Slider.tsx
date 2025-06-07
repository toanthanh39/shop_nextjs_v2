// components/Slider.js

import { Swiper, SwiperSlide , SwiperProps } from "swiper/react";

import "swiper/css";

import "swiper/css/pagination";

import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import "swiper/css/effect-fade";

import {
	Pagination,
	Navigation,
	Scrollbar,
	Grid,
	Keyboard,
	Mousewheel,
	Parallax,
	A11y,
	FreeMode,
	Autoplay,
	EffectFade,
} from "swiper/modules";
import { JSX } from "react";

import { ComDataSource } from "@/types/Component";

import useIntersectionObserver from "@/lib/hooks/optimization/useIntersectionObserver";

type SliderProps = SwiperProps &
	ComDataSource<any> & {
		useAnimation?: boolean;
		render: (item: any, index: number) => React.ReactNode | JSX.Element;
	};

export default function Slider<D>({
	dataSource,
	useAnimation,
	className,
	render,
	...props
}: SliderProps) {
	const { ref } = useIntersectionObserver({
		processEntry: (entry) => {
			entry.target.classList.add("active");
		},
		options: {
			threshold: 0,
		},
		enable: !!useAnimation,
	});

	return (
		<Swiper
			ref={ref}
			className={className}
			modules={[
				Pagination,
				Navigation,
				Scrollbar,
				Grid,
				Keyboard,
				Mousewheel,
				Parallax,
				A11y,
				FreeMode,
				Autoplay,
				EffectFade,
			]}
			pagination={{ clickable: true }}
			// onSlideChange={() => console.log("slide change")}
			// onSwiper={(swiper) => console.log(swiper)}
			{...props}>
			{Array.isArray(dataSource) &&
				dataSource.map((data, index) => (
					<SwiperSlide key={index}> {render(data, index)}</SwiperSlide>
				))}
		</Swiper>
	);
}
