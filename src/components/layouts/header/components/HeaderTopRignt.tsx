"use client";

import { ComProps } from "@/types/Component";

import Popup from "@/components/composite/Popup";
import Flex from "@/components/ui/Flex";
import Text from "@/components/ui/Text";

import useToggle from "@/lib/hooks/utilities/useToggle";
import { cn } from "@/utils/utils";

import Notification from "./Notification";

type Props = ComProps & {
	title: string;
};
export default function HeaderTopRignt({ title, className }: Props) {
	const { state, toggle } = useToggle(false);

	return (
		<div className={cn("w-1/2 max-lg:hidden py-2", className)}>
			<Flex gap={2} justify="end" align="center">
				<Text as="span" className="cursor-pointer" onClick={toggle}>
					{title}
				</Text>
				<Notification />
			</Flex>
			<Popup
				open={state}
				onOpenChange={toggle}
				title={<Text.p size="lg">Heading</Text.p>}>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quod
					quas officiis, ullam similique iusto harum alias voluptatum facilis,
					nisi corrupti veritatis asperiores exercitationem earum dolore neque?
					Animi, obcaecati consequuntur.
				</p>
			</Popup>
		</div>
	);
}
