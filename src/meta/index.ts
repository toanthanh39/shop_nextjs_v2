import { SettingConst } from "@/common/constants/setting";
import SettingRepo from "@/services/api/repositories/SettingRepo";
import { Metadata } from "next";

export const metadataNotFound = function (): Metadata {
	return {
		title: "not found",
	};
};
export async function generateMetadataSite() {
	try {
		const res = await new SettingRepo().getOne<Metadata>(
			SettingConst.metadata.site
		);
		return res.value;
	} catch (error) {
		return metadataNotFound();
	}
}
