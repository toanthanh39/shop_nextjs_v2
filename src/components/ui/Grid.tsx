import { cva, VariantProps } from "class-variance-authority";
import { DetailedHTMLProps , HTMLAttributes } from "react";

import { cn } from "@/utils/utils";

const variants = cva("grid", {
	variants: {
		cols: {
			1: "grid-cols-1",
			2: "grid-cols-2",
			3: "grid-cols-3",
			4: "grid-cols-4",
			5: "grid-cols-5",
			6: "grid-cols-6",
			12: "grid-cols-12",
		},
		sm: {
			default: "",
			1: "sm:grid-cols-1",
			2: "sm:grid-cols-2",
			3: "sm:grid-cols-3",
			4: "sm:grid-cols-4",
			5: "sm:grid-cols-5",
			6: "sm:grid-cols-6",
			12: "sm:grid-cols-12",
		},
		md: {
			default: "",
			1: "md:grid-cols-1",
			2: "md:grid-cols-2",
			3: "md:grid-cols-3",
			4: "md:grid-cols-4",
			5: "md:grid-cols-5",
			6: "md:grid-cols-6",
			12: "md:grid-cols-12",
		},
		lg: {
			default: "",
			1: "lg:grid-cols-1",
			2: "lg:grid-cols-2",
			3: "lg:grid-cols-3",
			4: "lg:grid-cols-4",
			5: "lg:grid-cols-5",
			6: "lg:grid-cols-6",
			12: "lg:grid-cols-12",
		},
		xl: {
			default: "",
			auto: "grid-cols-[repeat(auto-fit,minmax(100px,1fr))]",
			1: "xl:grid-cols-1",
			2: "xl:grid-cols-2",
			3: "xl:grid-cols-3",
			4: "xl:grid-cols-4",
			5: "xl:grid-cols-5",
			6: "xl:grid-cols-6",
			12: "xl:grid-cols-12",
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
		},
	},
	defaultVariants: {
		cols: 2, // Default to 2 columns
		sm: "default",
		md: "default",
		lg: "default",
		xl: "default",
		gap: 0, // Default to no gap
	},
});

interface GridProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
		VariantProps<typeof variants> {
	children?: React.ReactNode;
}

export default function Grid({
	children,
	className,
	cols,
	gap,
	sm,
	md,
	lg,
	xl,
	...props
}: GridProps) {
	return (
		<div
			className={cn(variants({ cols, gap, sm, md, lg, xl, className }))}
			{...props}>
			{children}
		</div>
	);
}
