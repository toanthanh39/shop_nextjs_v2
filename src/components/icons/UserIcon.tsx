import { VariantProps } from "class-variance-authority";

import { sizes, variants } from "@/styles/svg-variant";

import { cn } from "@/utils/utils";

interface UserIconProps
	extends VariantProps<typeof variants>,
		VariantProps<typeof sizes> {}

export default function UserIcon(props: UserIconProps) {
	const { size, variant } = props;

	// className={cn(variants({ variant }))}
	// width={cn(sizes({ size }))}
	// height={cn(sizes({ size }))}
	return (
		<>
			<svg
				className={cn(variants({ variant }))}
				width={cn(sizes({ size }))}
				height={cn(sizes({ size }))}
				viewBox="0 0 19 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M9.16406 9C11.2351 9 12.9141 7.32107 12.9141 5.25C12.9141 3.17893 11.2351 1.5 9.16406 1.5C7.09299 1.5 5.41406 3.17893 5.41406 5.25C5.41406 7.32107 7.09299 9 9.16406 9Z"
					stroke="currentColor"
					strokeOpacity="0.88"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M15.6067 16.5C15.6067 13.5975 12.7192 11.25 9.16418 11.25C5.60918 11.25 2.72168 13.5975 2.72168 16.5"
					stroke="currentColor"
					strokeOpacity="0.88"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</>
	);
}
