import SettingRepo from "@/services/api/repositories/SettingRepo";
import { CommunicationJson } from "@/types/Header.type";

import CustomImage from "@/components/ui/CustomImage";
import Flex from "@/components/ui/Flex";
import LinkElement from "@/components/ui/Link";
import Text from "@/components/ui/Text";

import { SettingConst } from "@/common/constants/setting";

const getDataServer = async () => {
	try {
		const res = await new SettingRepo().getOne<CommunicationJson[]>(
			SettingConst.header.communication,
			{
				cache: "force-cache",
			}
		);
		return res.value;
	} catch (error) {
		return [];
	}
};

export default async function HeaderNmagazine() {
	const data = await getDataServer();
	const value = [
		{
			title: "Cộng đồng nước hóa",
			action: "thảo luận",
			link: "https://trendy.namperfume.net/category/cau-chuyen-nuoc-hoa/",
			image:
				"https://ldevasset.namefragrance.vn/uploads/filecloud/1/2024/March/1118-429891711090943-1711090943.png",
		},
		{
			title: "Xu hướng Nước hoa",
			action: "Tham gia",
			link: "https://trendy.namperfume.net/category/xu-huong/",
			image:
				"https://ldevasset.namefragrance.vn/uploads/filecloud/1/2024/March/1117-228761711090939-1711090939.png",
		},
		{
			title: "Góc Review",
			action: "Xem ngay",
			link: "https://trendy.namperfume.net/category/goc-review/",
			image:
				"https://ldevasset.namefragrance.vn/uploads/filecloud/1/2024/March/1116-796041711090935-1711090935.png",
		},
		{
			title: "Feedback & Instore",
			action: "Xem ngay",
			link: "https://trendy.namperfume.net/",
			image:
				"https://ldevasset.namefragrance.vn/uploads/filecloud/1/2024/March/1115-639341711090931-1711090931.png",
		},
	];
	return (
		<div className="group relative pr-4 basis-[120px] border-r border-colors-gray-2 ">
			<LinkElement
				className="block text-center"
				href="/pages/nmagazine"
				prefetch>
				Nmagazine
			</LinkElement>
			{data && (
				<Flex
					direction="col"
					className="group-hover:visible invisible absolute  z-header  top-full right-auto -translate-x-1/4 w-max  left-0  bg-white border border-colors-gray-2 shadow-lg">
					{data.map((item, index) => {
						return (
							<Flex
								key={index}
								gap={4}
								align="center"
								className="not-last:border-b border-color-gray-2 p-4 w-fit">
								<CustomImage
									src={item.image}
									width={60}
									height={60}
									alt={item.title}
									loading="lazy"
								/>
								<Flex direction="col">
									<Text.p className="whitespace-nowrap font-bold">
										{item.title}
									</Text.p>

									<LinkElement href={item.link} className="whitespace-nowrap">
										{item.action}
									</LinkElement>
								</Flex>
							</Flex>
						);
					})}
				</Flex>
			)}
		</div>
	);
}
