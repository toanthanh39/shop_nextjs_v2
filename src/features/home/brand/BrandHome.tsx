import { SettingConst } from "@/common/constants/setting";
import { getMultiSettingServer } from "@/services/api/setting/server";
import { BrandHomeData } from "@/types/Home.type";
import detectSetting from "@/utils/detectSetting";
import BrandSlider from "./BrandSlider";
import BrandGrid from "./BrandGrid";
import Heading from "@/components/ui/Heading";
import Flex from "@/components/ui/Flex";

const keys = [
	SettingConst.home.section_brand_namperfume,
	SettingConst.home.banner_brand,
	"brand_title",
];

async function getDataBrands() {
	try {
		const res = await getMultiSettingServer<unknown>(
			keys.join(","),
			undefined,
			true
		);
		return res.items;
	} catch (error) {}
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

	const title = detectSetting<string>("brand_title", data)?.value;
	return (
		<section className="w-full ">
			<Heading className="bloc mb-4" variant={"productCollection"} level={1}>
				{title && title}
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
