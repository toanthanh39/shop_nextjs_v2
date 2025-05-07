import CustomImage from "@/components/ui/CustomImage";
import LinkElement from "@/components/ui/Link";
import { ComProps } from "@/types/Component";
import { ComDataSource } from "@/types/Component";
import { BrandHomeData } from "@/types/Home.type";
import { cn } from "@/utils/utils";

type Props = ComDataSource<BrandHomeData> & ComProps;
export default function BrandGrid({ className, dataSource }: Props) {
	return (
		<section className={cn("grid grid-cols-4", className)}>
			{dataSource.map((item, index) => {
				return (
					<LinkElement
						className={cn(
							"border-r border-b border-r-colors-gray-2 border-b-colors-gray-2",
							{
								"border-t border-t-colors-gray-2": index < 4,
								"border-l border-l-colors-gray-2": index % 4 === 0,
							}
						)}
						key={item.id}
						href={item.link}>
						<CustomImage
							className="lg:hidden"
							src={item.image}
							alt={item.alt}
							width={288}
							height={156}
							loading="eager"
							priority
							layout="responsive"></CustomImage>

						<CustomImage
							className="max-lg:hidden"
							src={item.image}
							alt={item.alt}
							width={6.12}
							height={2.88}
							loading="eager"
							priority
							layout="responsive"></CustomImage>
						{/* <picture>
							<source
								media="(max-width:767px )"
								srcSet={item.image_mobile}
								type="image/webp"
							/>
							<source
								media="(min-width:768px )"
								srcSet={item.image}
								type="image/webp"
							/>

							<CustomImage
								src={item.image}
								alt={item.alt}
								width={6.12}
								height={2.88}
								loading="eager"
								priority
								layout="responsive"></CustomImage>
						</picture> */}
					</LinkElement>
				);
			})}
		</section>
	);
}
