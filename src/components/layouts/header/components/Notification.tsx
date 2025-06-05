"use client";
import { RingIcon } from "@/components/icons";
import Badge from "@/components/ui/Badge";
import CustomImage from "@/components/ui/CustomImage";
import Empty from "@/components/ui/Empty";
import Flex from "@/components/ui/Flex";
import LinkElement from "@/components/ui/Link";
import Text from "@/components/ui/Text";
import useNotfication from "@/lib/hooks/cache/useNotfication";
import { ComProps } from "@/types/Component";
import { cn } from "@/utils/utils";

export default function Notification({ className }: ComProps) {
	const { isLoading, results } = useNotfication();
	return (
		<div className={cn("relative", className)}>
			<Badge className="group" count={results.total}>
				<RingIcon />
				<Flex
					direction="col"
					className=" hidden absolute left-auto right-0 top-full w-fit lg:group-hover:inline-block bg-white z-header border border-colors-gray-2 shadow-lg">
					<div className="max-h-[70vh] min-w-[380px] p-2">
						<Text.p className="mb-2" variant="secondary">
							Thông báo mới
						</Text.p>
						<Flex direction="col" gap={4} align="start">
							<Empty dataSource={results.new}>
								{results.new.map((item, index) => {
									return (
										<LinkElement
											key={item.id}
											href={
												"/collections/" + item.collections?.[0]?.handle + ""
											}
											prefetch={false}>
											<Flex key={index}>
												<CustomImage
													width={100}
													height={100}
													src={item.images?.[0]?.url || ""}
													alt={item.handle}></CustomImage>
												<Text.p>{item.title}</Text.p>
											</Flex>
										</LinkElement>
									);
								})}
							</Empty>
						</Flex>
					</div>
					<div className="max-h-[70vh] min-w-[380px] p-2">
						<Text.p className="mb-2" variant="secondary">
							Thông báo gần đây
						</Text.p>
						<Flex direction="col" gap={4} align="start">
							<Empty dataSource={results.recent}>
								{results.recent.map((item) => {
									return (
										<LinkElement
											key={item.id}
											href={
												"/collections/" + item.collections?.[0]?.handle + ""
											}
											prefetch={false}>
											<Flex key={item.id} gap={4}>
												<CustomImage
													width={100}
													height={100}
													src={item.images?.[0]?.url || ""}
													alt={item.handle}></CustomImage>
												<Text.p>{item.title}</Text.p>
											</Flex>
										</LinkElement>
									);
								})}
							</Empty>
						</Flex>
					</div>
				</Flex>
			</Badge>
		</div>
	);
}
