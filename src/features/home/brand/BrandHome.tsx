import SettingRepo from "@/services/api/repositories/SettingRepo";
import { BrandHomeData } from "@/types/Home.type";

import Flex from "@/components/ui/Flex";
import Heading from "@/components/ui/Heading";

import { SettingConst } from "@/common/constants/setting";
import detectSetting from "@/utils/detectSetting";

import BrandGrid from "./BrandGrid";
import BrandSlider from "./BrandSlider";
import { getTranslations } from "next-intl/server";

const keys = [
	SettingConst.home.section_brand_namperfume,
	SettingConst.home.banner_brand,
];

async function getDataBrands() {
	try {
		const res = await new SettingRepo().getAll<unknown>(
			keys.join(","),
			undefined,
			true
		);
		return res.items;
	} catch (error) {
		return [];
	}
}

export default async function BrandHome() {
	const data = await getDataBrands();

	const dataBrandSlide = detectSetting<BrandHomeData[]>(
		SettingConst.home.banner_brand,
		data
	);

	const dataBrandGrid = detectSetting<BrandHomeData[]>(
		SettingConst.home.section_brand_namperfume,
		data
	);

	// const title = detectSetting<string>("brand_title", data)?.value;
	const t = await getTranslations("brand");
	return (
		<section className="w-full ">
			<Heading className="block mb-4" variant={"productCollection"} level={1}>
				{t("title")}
			</Heading>
			<Flex className="">
				{dataBrandSlide && (
					<BrandSlider
						className="w-1/2 hidden sm:block"
						dataSource={dataBrandSlide.value}></BrandSlider>
				)}

				{dataBrandGrid && (
					<BrandGrid
						className="w-full sm:w-1/2"
						dataSource={dataBrandGrid.value}></BrandGrid>
				)}
			</Flex>
		</section>
	);
}
