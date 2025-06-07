"use client";

import { ComProps } from "@/types/Component";

import { Button } from "../ui";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/shacdn/Popover";

type Props = ComProps & {
	triggerLabel?: React.ReactNode;
	side?: "top" | "right" | "bottom" | "left";
	align?: "center" | "start" | "end";
};
export default function PopoverUI(props: Props) {
	const { triggerLabel, children, side, align } = props;
	return (
		<Popover>
			<PopoverTrigger asChild>
				{triggerLabel ?? <Button variant="default">Open</Button>}
			</PopoverTrigger>
			<PopoverContent
				className="w-fit border-current"
				side={side}
				align={align}>
				{children}
			</PopoverContent>
		</Popover>
	);
}
