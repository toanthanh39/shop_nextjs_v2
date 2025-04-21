import { cva } from "class-variance-authority";

export const uiTextSizes = cva("", {
	variants: {
		size: {
			default: "text-base",
			xl: "text-xl",
			lg: "text-lg",
			sm: "text-sm",
			xs: "text-xs",
		},
	},
	defaultVariants: {
		size: "default",
	},
});
