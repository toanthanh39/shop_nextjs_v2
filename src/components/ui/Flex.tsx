import { cn } from "@/utils/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { DetailedHTMLProps } from "react";
import { HTMLAttributes } from "react";

const variants = cva("flex w-full", {
	variants: {
		direction: {
			row: "flex-row",
			col: "flex-col",
			"col-sm": "sm:flex-col",
			"col-md": "md:flex-col",
			"col-lg": "lg:flex-col",
			"col-xl": "xl:flex-col",
		},
		justify: {
			center: "justify-center",
			end: "justify-end",
			start: "justify-start",
			between: "justify-between",
			evenly: "justify-evenly",
		},
		align: {
			center: "items-center",
			start: "items-start",
			end: "items-end",
			between: "items-between",
		},
		wrap: {
			wrap: "flex-wrap",
			"no-wrap": "flex-nowrap",
		},
		gap: {
			0: "",
			2: "gap-0.5",
			4: "gap-1",
			8: "gap-2",
			12: "gap-3",
			16: "gap-4",
			24: "gap-6",
			32: "gap-8",
			48: "gap-12",
		},
	},
	defaultVariants: {
		direction: "row",
		justify: "start",
		align: "start",
		wrap: "no-wrap",
		gap: 0,
	},
});
interface FlexProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
		VariantProps<typeof variants> {
	children?: React.ReactNode;
	as?: React.ElementType;
	vertical?: boolean;
}

export default function Flex({
	children,
	className,
	direction,
	justify,
	align,
	wrap,
	gap,
	as: Component = "div",
	vertical,
	...props
}: FlexProps) {
	const directionProps = vertical ? "col" : direction;
	return (
		<Component
			className={cn(
				variants({
					align,
					justify,
					gap,
					wrap,
					className,
					direction: directionProps,
				})
			)}
			{...props}>
			{children}
		</Component>
	);
}
