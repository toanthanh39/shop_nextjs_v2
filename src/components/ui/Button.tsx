import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/utils";

import { LoadingIcon } from "../icons";

export const buttonVariants = cva(
	"inline-flex items-center justify-center w-fit whitespace-nowrap rounded font-medium cursor-pointer  transition-colors  disabled:opacity-50 disabled:cursor-not-allowed",
	{
		// ring-colors-red-5 ring-1
		variants: {
			variant: {
				default: "border border-input text-colors-gray-5",
				primary: "bg-colors-red-5 text-white lg:hover:bg-red-700",
				secondary: "bg-colors-gray-5 text-white",
				text: "text-colors-gray-5 lg:hover:bg-colors-gray-2",
				link: "text-colors-blue-5 lg:hover:bg-colors-blue-5/80 lg:hover:text-white",
			},

			size: {
				default: "h-10 px-4 py-2 text-base",
				lg: "h-12 px-6 py-3 text-lg",
				sm: "h-8 py-1 px-2 text-sm",
				icon: "h-10 w-10 text-sm",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	icon?: React.ReactNode;
	loading?: boolean;
	block?: boolean;
}

export default function Button({
	className,
	variant,
	size,
	asChild = false,
	children,
	icon,
	loading = false,
	block = false,
	...props
}: ButtonProps) {
	const Comp = "button";
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }), {
				"cursor-wait": loading,
				"w-full": block,
			})}
			{...props}>
			{loading ? <LoadingIcon className="mr-1" size="md" /> : icon && icon}
			{children && children}
		</Comp>
	);
}
