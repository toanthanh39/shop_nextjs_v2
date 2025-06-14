import { translations } from "@/lib/data/locales";
import SettingRepo from "@/services/api/repositories/SettingRepo";
import { ComProps } from "@/types/Component";
import { AboutSettingJson } from "@/types/Home.type";

import { SettingConst } from "@/common/constants/setting";
import detectSetting from "@/utils/detectSetting";
import { cn } from "@/utils/utils";

import AboutTabs from "./about/AboutTabs";

type Props = ComProps;
const keys = [
	SettingConst.home.about_namperfume_first,
	SettingConst.home.about_namperfume_second,
	translations.main.sections.about_namperfume,
].join(",");

async function getData() {
	try {
		const response = await new SettingRepo().getAll<unknown>(keys);

		return response.items;
	} catch (error) {
		return [];
	}
}

export default async function SectionAbout({ className }: Props) {
	const data = await getData();

	const dataTabFirst = detectSetting<AboutSettingJson[]>(
		SettingConst.home.about_namperfume_first,
		data
	);
	const dataTabSecond = detectSetting<AboutSettingJson[]>(
		SettingConst.home.about_namperfume_second,
		data
	);

	const title = detectSetting<string>(
		translations.main.sections.about_namperfume,
		data
	)?.value;

	return (
		<section className={cn("mt-8", className)}>
			{dataTabFirst && (
				<AboutTabs title={title} dataSource={dataTabFirst.value}></AboutTabs>
			)}
			{dataTabSecond && (
				<AboutTabs title={title} dataSource={dataTabSecond.value}></AboutTabs>
			)}
		</section>
	);
}
