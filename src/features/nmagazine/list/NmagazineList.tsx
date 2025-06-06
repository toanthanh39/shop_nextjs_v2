import BrandRepo from "@/services/api/repositories/BrandRepo";
import { ComProps } from "@/types/Component";

import { Button, Heading } from "@/components/ui";

import { cn } from "@/utils/utils";

import NamgazineSlider from "./NmagazineSlider";

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
		return await new BrandRepo().getAll({ limit: 20, page: 1 });
	} catch (error) {}
}

export default async function NmagazineList(props: Props) {
	const { className, title, link, more } = props;
	const data = await getData();

	if (!data) return null;

	return (
		<section className={cn("relative w-full mb-2", className)}>
			{title && (
				<Heading className=" mb-4" level={1} variant="productCollection">
					{title}
				</Heading>
			)}
			<NamgazineSlider dataSource={data.items} />
			{more && (
				<Button className="mx-auto block mt-2" variant="default">
					{more.title}
				</Button>
			)}
		</section>
	);
}
