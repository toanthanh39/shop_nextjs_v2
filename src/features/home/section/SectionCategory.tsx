import { CustomImage, Flex, LinkElement, Text } from "@/components/ui";
import { ComDataSource } from "@/types/Component";
import { SectionCategoryJson } from "@/types/Home.type";

type Props = ComDataSource<SectionCategoryJson>;
export default function SectionCategory({ dataSource }: Props) {
	return (
		<section className="w-full">
			<Flex className="max-md:flex-col" gap={16}>
				{dataSource.map((item) => {
					return (
						<LinkElement
							className="relative w-full"
							key={item.id}
							href={item.link}
							prefetch>
							<CustomImage
								className="max-md:hidden"
								// height={500}
								width={396}
								height={500}
								// width={300}
								src={item.image_desktop}
								alt={item.alt}
								layout="responsive"
								loading="lazy"></CustomImage>
							<CustomImage
								className="md:hidden"
								src={item.image_mobile}
								width={414}
								height={414}
								layout="responsive"
								alt={item.alt}
								loading="lazy"></CustomImage>
							<Text
								as="span"
								className="absolute bottom-[10%] left-1/2 -translate-x-1/2 whitespace-nowrap"
								size="lg"
								weight="bold">
								{item.title}
							</Text>
						</LinkElement>
					);
				})}
			</Flex>
		</section>
	);
}
