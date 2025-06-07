import { Metadata } from "next";

import SettingRepo from "@/services/api/repositories/SettingRepo";

import { SettingConst } from "@/common/constants/setting";

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
