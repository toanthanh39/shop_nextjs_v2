import { SettingConst } from "@/common/constants/setting";
import { SiteConst } from "@/common/constants/site";
import { getSettingServer } from "@/services/api/setting/server";
import { CollectionJson } from "@/types/Collection.type";
import { Metadata } from "next";

export const metadataNotFound = function (): Metadata {
	return {
		title: "not found",
	};
};
export async function generateMetadataSite() {
	try {
		const res = await getSettingServer<Metadata>(SettingConst.metadata.site);
		return res.value;
	} catch (error) {
		return metadataNotFound();
	}
}
