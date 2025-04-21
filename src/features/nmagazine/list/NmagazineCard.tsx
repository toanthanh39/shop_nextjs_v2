import { Text } from "@/components/ui";
import { Card, CardContent, CardImage } from "@/components/ui/Card";
import { BrandJson } from "@/types/Brand.type";
import { ComProps } from "@/types/Component";

type Props = ComProps & {
	data: BrandJson;
};
export default function NmagazineCard({ data }: Props) {
	return (
		<Card className="p-0">
			<CardImage
				src={data.images?.[0]?.url ?? ""}
				width={330}
				height={165}
				alt={data.title}
				loading="lazy"
				className="w-full h-25 lg:h-[165px] object-cover"
			/>

			<CardContent>
				<Text as="span">{data.title}</Text>
			</CardContent>
		</Card>
	);
}
