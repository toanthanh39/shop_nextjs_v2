import LinkElement from "@/components/ui/Link";
import Text from "@/components/ui/Text";
import { translations } from "@/lib/data/locales";
import { getMultiSettingServer } from "@/services/api/setting/server";
import { detectKeyFromSetting } from "@/utils/detectSetting";

const keyTranslates = [...Object.values(translations.header.announcement)];

async function getDataServer() {
	const keys = keyTranslates.join(",");
	try {
		const data = await getMultiSettingServer<string>(keys);

		return data.items;
	} catch (error) {
		return [];
	}
}

export default async function Anouncement() {
	const data = await getDataServer();

	const t = detectKeyFromSetting(keyTranslates, data);

	return (
		<section className="bg-colors-red-5 py-1 text-whitesmoke text-center hidden md:block">
			<Text.p variant="primaryReverse" className="inline mr-1">
				{t.announcement_bar}
			</Text.p>
			<LinkElement variant="primaryReverse" href="/pages/thuong-hieu-nuoc-hoa">
				{t.announcement_detail}
			</LinkElement>
		</section>
	);
}
