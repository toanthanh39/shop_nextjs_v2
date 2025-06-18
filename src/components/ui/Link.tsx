import { cva, VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import React from "react";

import { cn } from "@/utils/utils";

type LinkAtribute = React.AnchorHTMLAttributes<HTMLAnchorElement>;
export interface LinkElementProps
	extends LinkProps,
		Pick<LinkAtribute, "target" | "title">,
		React.RefAttributes<HTMLAnchorElement>,
		VariantProps<typeof variants> {
	children?: React.ReactNode | undefined;
	className?: string;
}

const variants = cva("inline-block hover:underline", {
	variants: {
		variant: {
			default: "text-colors-gray-5",
			primary: "text-colors-red-5",
			secondary: "text-colors-gray-4",
			link: "text-colors-blue-5 underline-offset-4 hover:underline hover:text-semibold transition-all",
			primaryReverse: "text-whitesmoke",
			active: "text-colors-red-5 font-bold",
			none: "text-inherit hover:text-inherit",
		},
		size: {
			default: "text-base",
			sm: "text-sm",
			xxs: "text-[10px]",
		},

		weight: {
			default: "",
			bold: "font-bold",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
		weight: "default",
	},
});

export default function LinkElement({
	href,
	children,
	variant,
	size,
	weight,
	className,
	title,
	...props
}: LinkElementProps) {
	return (
		<Link
			className={cn(variants({ variant, size, weight, className }))}
			href={href}
			prefetch={props.prefetch}
			title={title}>
			{children}
		</Link>
	);
}
