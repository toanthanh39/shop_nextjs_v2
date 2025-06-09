"use client";
import PopoverUI from "@/components/composite/PopoverUI";
import PrelineScriptWrapper from "@/components/scripts/prelineScriptWrapper";
import {
	Button,
	Flex,
	Grid,
	Heading,
	Label,
	Space,
	Text,
} from "@/components/ui";
import { Accordion, AvatarGroup } from "@/components/ui/preline";
import { Breadcrumbs } from "@/components/ui/preline/navigations";
import { Dropdown } from "@/components/ui/preline/overlays";

export default function DevComponents() {
	const title = "Xem thêm";
	return (
		<div className="fixed bottom-16 lg:bottom-4 right-4 z-header ">
			<PrelineScriptWrapper></PrelineScriptWrapper>
			<PopoverUI triggerLabel={<Button variant="secondary">DEV</Button>}>
				<Space className="bg-blue-100 shadow-2xl p-2">
					<Grid cols={3} xl={6} md={4} gap={4}>
						<Button className="mx-auto block" variant="default">
							{title}
						</Button>

						<Button className="mx-auto block" variant="primary">
							{title}
						</Button>
						<Button className="mx-auto block" variant="secondary">
							{title}
						</Button>
						<Button className="mx-auto block" variant="text">
							{title}
						</Button>

						<Button className="mx-auto block" variant="link">
							{title}
						</Button>
					</Grid>
					<hr className="my-2" />
					<Label variant="secondary">
						<Text.small variant="none" className="sm:hidden">
							{"xs < 40rem - 640px"}
						</Text.small>
						<Text.small variant="none" className="hidden sm:block md:hidden">
							{"40rem - 640px <= sm <= 48rem - 768px"}
						</Text.small>
						<Text.small variant="none" className="hidden md:block lg:hidden">
							{"	48rem - 768px <= md <= 64rem - 1024px"}
						</Text.small>
						<Text.small variant="none" className="hidden lg:block xl:hidden">
							{"	64rem - 1024px <= lg <= 80rem - 1280px"}
						</Text.small>
						<Text.small variant="none" className="hidden xl:block">
							{"	80rem - 1280px	<= xl "}
						</Text.small>
					</Label>
					<hr />

					<Heading level={1}>Heading1</Heading>
					<Heading level={2}>Heading2</Heading>
					<Heading level={3}>Heading3</Heading>
					<Heading level={4}>Heading4</Heading>
					<Heading level={5}>Heading5</Heading>
					<Heading level={6}>Heading6</Heading>
					<hr className="my-2" />

					<Accordion />
					<hr className="my-2" />

					<Flex gap={4}>
						<AvatarGroup />
						<Dropdown></Dropdown>
						<Breadcrumbs></Breadcrumbs>
					</Flex>
				</Space>
			</PopoverUI>
		</div>
	);
}
