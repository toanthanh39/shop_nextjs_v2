import { translations } from "@/lib/data/locales";
import { getMultiSettingServer } from "@/services/api/setting/server";
import { detectKeyFromSetting } from "@/utils/detectSetting";
import { notFound } from "next/navigation";
import HeaderTopLeft from "./HeaderTopLeft";
import HeaderTopRignt from "./HeaderTopRignt";
import Flex from "@/components/ui/Flex";
import { cn } from "@/utils/utils";

const keyTranslates = [...Object.values(translations.header.top)];

async function getDataServer() {
	const keys = keyTranslates.join(",");
	try {
		const data = await getMultiSettingServer<string>(keys);

		return data.items;
	} catch (error) {
		notFound();
	}
}
export default async function HeaderTop() {
	const data = await getDataServer();

	const t = detectKeyFromSetting(keyTranslates, data);
	return (
		<div
			className={cn(
				" bg-colors-gray-4  lg:bg-white border-b border-b-colors-gray-2"
			)}>
			<Flex className="container" align="center">
				<HeaderTopLeft
					dataSource={[
						t.header_top_left_1,
						t.header_top_left_2,
					]}></HeaderTopLeft>
				<HeaderTopRignt title={t.order_tracking} />
			</Flex>
		</div>
	);
}
