"use client";
import { ComDataSource } from "@/types/Component";
import { BannerHomeData } from "@/types/Home.type";

import Slider from "@/components/widgets/Slider";

import BannerItem from "./BannerItem";


type Props = ComDataSource<BannerHomeData> & {};
export default function BannerSlider({ dataSource }: Props) {
	const renderItem = (data: BannerHomeData) => {
		return <BannerItem key={data.id} data={data}></BannerItem>;
	};
	return (
		<Slider
			className="max-h-[880px]"
			autoplay={false}
			dataSource={dataSource}
			render={renderItem}></Slider>
	);
}
