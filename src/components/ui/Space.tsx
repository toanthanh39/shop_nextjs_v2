import { cn } from "@/utils/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { DetailedHTMLProps } from "react";
import { HTMLAttributes } from "react";

const variants = cva("block w-full", {
	variants: {},
	defaultVariants: {},
});
interface SpaceProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
		VariantProps<typeof variants> {
	children?: React.ReactNode;
	as?: React.ElementType;
}

export default function Space({
	children,
	className,
	as: Component = "div",
	...props
}: SpaceProps) {
	return (
		<Component
			className={cn(
				variants({
					className,
				})
			)}
			{...props}>
			{children}
		</Component>
	);
}
