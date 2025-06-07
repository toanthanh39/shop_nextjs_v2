import { Metadata } from "next";

import { CollectionJson } from "@/types/Collection.type";

import { SiteConst } from "@/common/constants/site";

export const metadataProductNotFound = function (): Metadata {
	return {
		title: "not found",
	};
};
export function generateMetadataCollection(
	collection: CollectionJson
): Metadata {
	if (!collection) {
		metadataProductNotFound();
	}
	const collectionTitle = collection.title;
	return {
		title: `${collectionTitle} | ${SiteConst.SITE_NAME}`,
		description: collection.description,
		openGraph: {
			title: `${collectionTitle} | ${SiteConst.SITE_NAME}`,
			description: collection.description,
			url: SiteConst.LINK + "/" + collection.handle,
			siteName: SiteConst.DOMAIN,
		},
	};
}
