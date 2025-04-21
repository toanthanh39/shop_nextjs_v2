import { Button, Heading, LinkElement } from "@/components/ui";
import { ComProps } from "@/types/Component";
import { cn } from "@/utils/utils";
import YoutubeSlider from "./YoutubeSlider";
import VideoRepo from "@/services/api/repositories/VideoRepo";
import { BaseAccessMode } from "@/types/Base.type";

type Props = ComProps & {
	title?: string;
	link?: string;
	more?: {
		title: string;
		link: string;
	};
};
async function getData() {
	try {
		const res = await new VideoRepo({
			accessMode: BaseAccessMode.PUBLIC_SERVER,
		}).getAll({ limit: 20, page: 1, order: "date" });
		return res.items;
	} catch (error) {}
}

export default async function NamperfumeTV(props: Props) {
	const { title, link, more, className } = props;
	const data = await getData();
	if (!data) return null;
	return (
		<section className={cn("relative w-full mb-2", className)}>
			{title && (
				<Heading className=" mb-4" level={1} variant="productCollection">
					{title}
				</Heading>
			)}
			<YoutubeSlider dataSource={data} />
			{more && (
				<Button className="mx-auto block mt-2" variant="default">
					{more.title}
				</Button>
			)}
		</section>
	);
}
