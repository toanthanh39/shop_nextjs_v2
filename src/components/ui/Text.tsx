import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/utils/utils";

const pVariants = cva("", {
	variants: {
		variant: {
			none: "",
			default: "text-colors-gray-5",
			secondary: "text-colors-gray-4",
			primary: "text-colors-red-5",
			link: "text-colors-blue-5 underline-offset-4 hover:underline hover:font-semibold transition-all",
			primaryReverse: "text-whitesmoke",
		},
		size: {
			default: "text-base",
			lg: "text-lg",
			md: "text-md",
			sm: "text-sm",
			xxs: "text-[10px]",
		},
		weight: {
			default: "",
			bold: "font-bold",
			semibold: "font-semibold",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
		weight: "default",
	},
});

const smallVariants = cva("", {
	variants: {
		variant: {
			none: "",
			default: "text-colors-gray-5",
			primary: "text-colors-red-5",
			secondary: "text-colors-gray-4",
			link: "text-colors-blue-5 underline-offset-4 hover:underline",
			primaryReverse: "text-whitesmoke",
		},
		size: {
			lg: "text-lg",
			default: "text-[10px]",
			sm: "text-sm",
			md: "text-md",
		},
		weight: {
			default: "",
			bold: "font-bold",
			semibold: "font-semibold",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
		weight: "default",
	},
});

export interface PProps
	extends React.HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof pVariants> {
	as?: React.ElementType;
}

export interface SmallProps
	extends React.HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof smallVariants> {}

export default function Text({
	variant,
	size,
	className,
	children,
	weight,
	as: Component = "p",
	...props
}: PProps) {
	return (
		<Component
			{...props}
			className={cn(pVariants({ variant, size, weight, className }))}>
			{children}
		</Component>
	);
}

Text.p = ({
	variant,
	size,
	className,
	children,
	weight,
	as: Component = "p",
	...props
}: PProps) => (
	<Component
		{...props}
		className={cn(pVariants({ variant, size, weight, className }))}>
		{children}
	</Component>
);

Text.small = ({
	variant,
	size,
	className,
	children,
	weight,
	...props
}: SmallProps) => (
	<small
		{...props}
		className={cn(smallVariants({ variant, size, weight, className }))}>
		{children}
	</small>
);
