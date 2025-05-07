import { cn } from "@/utils/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

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
			h1: "text-3xl",
			h2: "text-2xl",
			h3: "text-xl",
			h4: "text-lg",
			h5: "text-base",
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
	level: 1 | 2 | 3 | 4 | 5;
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
			className: cn(hVariants({ variant, size, weight, className })),
		},
		children
	);
}
