import { notFound } from "next/navigation";
import React, { Suspense } from "react";

import NamperfumeTV from "@/features/channels/youtube/NamperfumeTv";
import YoutubeListSkeleton from "@/features/channels/youtube/YoutubeListSkeleton";
import NmagazineList from "@/features/nmagazine/list/NmagazineList";
import { ProductCollection } from "@/features/product/list";
import ProductListSkeleton from "@/features/product/list/ProductListSkeleton";
import SettingRepo from "@/services/api/repositories/SettingRepo";
import { SectionJson } from "@/types/Home.type";

import { Flex } from "@/components/ui";

import { SettingConst } from "@/common/constants/setting";
import { checkActiveDate } from "@/utils/utils";

import { BrandHome } from "../brand";
import BrandHomeSkeleton from "../brand/BrandHomeSkeleton";

import SectionCategory from "./SectionCategory";

const keySettings = SettingConst.home.settings_website_namperfume_net;

async function getDataServer() {
	try {
		const data = await new SettingRepo().getOne<SectionJson[]>(keySettings);
		return data;
	} catch (error) {
		notFound();
	}
}

const renderSection = (
	item: SectionJson,
	index: number,
	timeServer: number
) => {
	const commonProps = {
		key: index,
		id: `shop_${item.type}_${item.id || ""}`,
	};

	const isShow = checkActiveDate(timeServer, item.from_time, item.to_time);
	if (!isShow) return null;
	switch (item.type) {
		case "section_banner":
			return (
				<React.Fragment key={commonProps.key}>
					<Suspense>
						<SectionCategory dataSource={item?.data ?? []} />
					</Suspense>
				</React.Fragment>
			);

		case "collection":
			if (!item.dataSource) return null;
			return (
				<Suspense fallback={<ProductListSkeleton />} key={commonProps.key}>
					<ProductCollection
						key={commonProps.key}
						params={item.dataSource.params}
						link={item.link}
						title={item.title}
						more={{ link: item.link_more, title: item.title_more }}
					/>
				</Suspense>
			);

		case "nmagazine":
			return (
				<React.Fragment key={commonProps.key}>
					<Suspense fallback={<YoutubeListSkeleton />} key={commonProps.key}>
						<NmagazineList link={item.link} title={item.title} />
					</Suspense>
				</React.Fragment>
			);

		case "namperfumetv":
			return (
				<React.Fragment key={commonProps.key}>
					<Suspense
						fallback={<ProductListSkeleton></ProductListSkeleton>}
						key={commonProps.key}>
						<NamperfumeTV link={item.link} title={item.title} />
					</Suspense>
				</React.Fragment>
			);

		default:
			return null;
	}
};

export default async function HomeSections() {
	const data = await getDataServer();
	const { time_server } = await new SettingRepo().getTimeServer();

	const dataSections = data?.value;

	return (
		<Flex className="container" direction="col" justify="start" gap={32}>
			<Suspense fallback={<BrandHomeSkeleton />}>
				<BrandHome />
			</Suspense>
			{dataSections &&
				dataSections.map((item, index) =>
					renderSection(item, index, time_server)
				)}
		</Flex>
	);
}
