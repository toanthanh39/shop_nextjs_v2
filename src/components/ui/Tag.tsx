import * as React from "react";

import { cva } from "class-variance-authority";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils";
import Text from "./Text";

const tagVariants = cva("relative rounded-sm  w-fit px-1", {
	variants: {
		variant: {
			default: "bg-colors-gray-5 text-whitesmoke",
			primary: "bg-colors-red-5 text-whitesmoke",
			genderMale: "bg-blue-400 text-white",
			genderFemale: "bg-pink-400 text-white",
		},
		size: {
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
