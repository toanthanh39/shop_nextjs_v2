import { cva } from "class-variance-authority";

const variants = cva("inline-block", {
	variants: {
		variant: {
			default: "text-color-gray-5",
			primary: "text-colors-red-5 fill-colors-red-5",
			secondary: "text-color-gray-4 fill-color-gray-4",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const sizes = cva("", {
	variants: {
		size: {
			default: "24px",
			lg: "32px",
			md: "16px",
			sm: "14px",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

export { variants, sizes };
