"use client";

import Text from "@/components/ui/Text";
import Slider from "@/components/widgets/Slider";
import { ComDataSource, ComProps } from "@/types/Component";
import { cn } from "@/utils/utils";
import { useCallback } from "react";

type Props = ComProps & ComDataSource<string> & {};
export default function HeaderTopLeft({ dataSource, className }: Props) {
	const renderItem = useCallback(
		(text: string) => {
			return <Text.p className="max-lg:text-white ">{text}</Text.p>;
		},
		[dataSource]
	);
	return (
		<div
			className={cn(
				"w-full lg:w-1/2  py-1 lg:py-2 max-lg:text-center",
				className
			)}>
			<Slider
				dataSource={dataSource}
				effect="fade"
				render={renderItem}
				slidesPerView={1}
				spaceBetween={30}
				navigation={false}
				allowTouchMove={false}
				fadeEffect={{ crossFade: true }}
				autoplay={{
					delay: 2000,
					disableOnInteraction: false,
					waitForTransition: true,
				}}
				pagination={false}></Slider>
		</div>
	);
}
