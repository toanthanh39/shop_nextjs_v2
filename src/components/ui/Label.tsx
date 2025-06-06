import { cva, VariantProps } from "class-variance-authority";

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
export interface LabelProps
	extends ComProps,
		React.RefAttributes<HTMLLabelElement>,
		Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onClick">,
		VariantProps<typeof variants> {}

export default function Label({
	children,
	size,
	variant,
	className,
}: LabelProps) {
	return (
		<label className={cn(variants({ variant, size, className }))}>
			{children}
		</label>
	);
}
