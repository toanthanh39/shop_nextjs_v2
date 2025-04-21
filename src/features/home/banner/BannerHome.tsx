import { SettingConst } from "@/common/constants/setting";
import { getSettingServer } from "@/services/api/setting/server";
import { BannerHomeData } from "@/types/Home.type";
import { detectTimeServer } from "@/utils/detectServer";
import { checkActiveDate } from "@/utils/utils";
import BannerSlider from "./BannerSlider";

async function customFunction() {
	try {
		const res = await getSettingServer<BannerHomeData[]>(
			SettingConst.home.banner_home
		);

		const timeServer = await detectTimeServer();
		return res.value.filter((i) =>
			checkActiveDate(timeServer, i?.from_time ?? 0, i?.to_time ?? 0)
		);
	} catch (error) {
		return [];
	}
}

export default async function BannerHome() {
	const data = await customFunction();
	return (
		<section className="w-full relative mx-auto max-w-[2500px] mb-6  ">
			<BannerSlider dataSource={data}></BannerSlider>
		</section>
	);
}
