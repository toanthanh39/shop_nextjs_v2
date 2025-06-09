import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/utils/utils";

const hVariants = cva("", {
	variants: {
		variant: {
			default: "text-colors-gray-5",
			primary: "text-colors-red-5",
			secondary: "text-colors-gray-4",
			link: "text-colors-blue-5 underline-offset-4 hover:underline",
			productCollection:
				"max-md:container-padding max-md:text-xl md:font-noto max-md:font-semibold text-colors-gray-5 ",
			white: "text-whitesmoke",
		},
		size: {
			h1: "text-4xl",
			h2: "text-3xl",
			h3: "text-2xl",
			h4: "text-xl",
			h5: "text-lg",
			h6: "text-base",
		},
		weight: {
			default: "",
			bold: "font-bold",
			semibold: "font-semibold",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "h1",
		weight: "default",
	},
});

interface HeadingProps
	extends React.HTMLAttributes<HTMLHeadingElement>,
		VariantProps<typeof hVariants> {
	level: 1 | 2 | 3 | 4 | 5 | 6;
}
export default function Heading({
	variant,
	size,
	className,
	children,
	level,
	weight,
	...props
}: HeadingProps) {
	const Comp = `h${level}`;
	return React.createElement(
		Comp,
		{
			...props,
			className: cn(
				hVariants({
					variant,
					size: size
						? size
						: (`h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"),
					weight,
					className,
				})
			),
		},
		children
	);
}
