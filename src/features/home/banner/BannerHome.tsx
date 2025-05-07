import { SettingConst } from "@/common/constants/setting";
import { BannerHomeData } from "@/types/Home.type";
import { checkActiveDate } from "@/utils/utils";
import BannerSlider from "./BannerSlider";
import SettingRepo from "@/services/api/repositories/SettingRepo";

async function customFunction() {
	try {
		const res = await new SettingRepo().getOne<BannerHomeData[]>(
			SettingConst.home.banner_home
		);

		const { time_server } = await new SettingRepo().getTimeServer();
		return res.value.filter((i) =>
			checkActiveDate(time_server, i?.from_time ?? 0, i?.to_time ?? 0)
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
