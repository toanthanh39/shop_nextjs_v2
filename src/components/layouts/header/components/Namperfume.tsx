"use client";

import { ComProps } from "@/types/Component";

import { LogoIcon } from "@/components/icons";
import { LinkElement } from "@/components/ui";

import { cn } from "@/utils/utils";

type Props = ComProps;
export default function Namperfume({ className }: Props) {
	return (
		<div className={cn("inline-block", className)}>
			<LinkElement href="/">
				<LogoIcon />
			</LinkElement>
		</div>
	);
}
