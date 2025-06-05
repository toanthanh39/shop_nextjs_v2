import * as React from "react";

import { cva } from "class-variance-authority";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils";

const tagVariants = cva("relative rounded-sm w-fit px-1", {
	variants: {
		variant: {
			default: "bg-colors-gray-5 text-whitesmoke",
			primary: "bg-colors-red-5 text-whitesmoke",
			genderMale: "bg-blue-400 text-white py-0",
			genderFemale: "bg-pink-400 text-white py-0",
			success: "bg-green-500 text-white py-1",
			secondary: "bg-colors-gray-4 text-white",
		},
		size: {
			lg: "text-lg py-1",
			default: "text-sm",
			xs: "text-xs",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export interface TagProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof tagVariants> {
	as?: React.ElementType;
}

export default function Tag({
	className,
	variant,
	size,
	children,
	as: Component = "span",

	...props
}: TagProps) {
	return (
		<Component
			className={cn(tagVariants({ variant, size }), className)}
			{...props}>
			{children}
		</Component>
	);
}
