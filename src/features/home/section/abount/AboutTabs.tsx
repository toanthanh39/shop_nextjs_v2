"use client";

import { CustomImage, Flex, Heading, LinkElement, Text } from "@/components/ui";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/shacdn/Tabs";
import { ComDataSource } from "@/types/Component";
import { ComProps } from "@/types/Component";
import { AboutSettingJson } from "@/types/Home.type";
import { cn } from "@/utils/utils";
import { useState } from "react";

type Props = ComProps &
	ComDataSource<AboutSettingJson> & {
		title?: string;
	};
export default function AboutTabs({ dataSource, title }: Props) {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (index: number) => {
		if (index === activeTab) {
			return;
		}
		setActiveTab(index);
	};
	/////////////////////////////////////////
	// process function
	const replaceText = (text: string) => {
		return {
			text: text.replace(/<\/?strong>/gi, ""),
			isContainHtmlTag: /<\/?strong>/gi.test(text),
		};
	};
	/////////////////////////////////////////
	return (
		<>
			{title && (
				<div className="py-8 bg-colors-gray-2 text-center font-noto">
					<Heading weight="bold" level={2}>
						{title}
					</Heading>
				</div>
			)}

			<Tabs defaultValue="0">
				<TabsList className=" py-8 max-md:overflow-x-scroll flex-nowrap gap-8 max-md:justify-start bg-colors-gray-2 hide-scroll-bar">
					{dataSource.map((item, index) => {
						return (
							<TabsTrigger
								onClick={() => handleTabChange(index)}
								key={index}
								value={index.toString()}
								className="group w-fit h-fit rounded-full ">
								<Flex direction="col" gap={8} align="center" justify="center">
									<div
										className={cn(
											"w-18 h-18 rounded-full overflow-hidden bg-white flex items-center justify-center",
											{
												"border border-colors-gray-5": index === activeTab,
											}
										)}>
										<CustomImage
											className="data-[state=active]:bg-colors-gray-3"
											src={item.nav.icon}
											width={40}
											height={40}
											alt={item.nav.title}></CustomImage>
									</div>

									<Text
										as="span"
										className="data-[state=active]:text-green-500">
										{item.nav.title}
									</Text>
								</Flex>
							</TabsTrigger>
						);
					})}
				</TabsList>
				{dataSource.map((item, index) => {
					return (
						<TabsContent
							className="container max-md:container-padding flex tex-center py-8 lg:py-10 min-h-40"
							key={index}
							value={index.toString()}>
							<Flex
								direction="col"
								justify="center"
								gap={16}
								className="max-w-150 mx-auto text-center">
								<Heading
									className="text-center mx-auto"
									level={3}
									size="h3"
									weight="semibold">
									{item.body.title}
								</Heading>
								<Flex direction="col" gap={8}>
									{item.body.content.map((item, index) => {
										const { text, isContainHtmlTag } = replaceText(item);
										return (
											<Text.p
												weight={isContainHtmlTag ? "bold" : "default"}
												className="text-center mx-auto"
												key={index}>
												{text}
											</Text.p>
										);
									})}
								</Flex>
								<LinkElement
									weight="bold"
									className="mx-auto mt-8"
									href={item.body.btnLink}>
									{item.body.btnLabel}
								</LinkElement>
							</Flex>
						</TabsContent>
					);
				})}
			</Tabs>
		</>
	);
}
