import { Heading } from "@/components/ui";
import StoryRepo from "@/services/api/repositories/StoryRepo";
import { notFound } from "next/navigation";

async function getData(handle: string) {
	try {
		return await new StoryRepo().getOne(handle);
	} catch (error) {
		notFound();
	}
}

export default async function Page({
	params,
}: {
	params: Promise<{ handle: string }>;
}) {
	const handle = (await params).handle;
	const data = await getData(handle);

	return (
		<main>
			<Heading level={1}>{data.title}</Heading>
		</main>
	);
}
