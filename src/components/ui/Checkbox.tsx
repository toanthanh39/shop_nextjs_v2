import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

import { ComProps } from "@/types/Component";

import { cn } from "@/utils/utils";
const variants = cva("inline-block py-1 px-2 rounded", {
	variants: {
		variant: {
			default: "text-colors-gray-5",
			primary: "bg-colors-red-5 text-white hover:bg-colors-red-5/80",
			secondary: "bg-colors-gray-5 text-white hover:bg-colors-gray-5/80",
			text: "text-colors-gray-5 hover:bg-colors-gray-2",
			link: "text-colors-blue-5 hover:bg-colors-blue-5/80 hover:text-white",
		},
		size: {
			default: "text-base",
			sm: "text-sm",
			xxs: "text-[10px]",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});
export interface CheckboxProps
	extends ComProps,
		React.RefAttributes<HTMLInputElement>,
		Omit<React.LabelHTMLAttributes<HTMLInputElement>, "onClick">,
		Pick<InputHTMLAttributes<HTMLInputElement>, "checked">,
		VariantProps<typeof variants> {}

export default function Checkbox({
	children,
	variant,
	size,
	className,
	...props
}: CheckboxProps) {
	return (
		<input
			{...props}
			type="checkbox"
			className={cn(variants({ variant, size, className }))}>
			{children}
		</input>
	);
}
