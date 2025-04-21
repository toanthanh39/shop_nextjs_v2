import { sizes, variants } from "@/styles/svg-variant";
import { ComProps } from "@/types/Component";
import { cn } from "@/utils/utils";
import { VariantProps } from "class-variance-authority";

interface HeartIconProps
	extends VariantProps<typeof variants>,
		ComProps,
		VariantProps<typeof sizes> {}

export default function HeartIcon(props: HeartIconProps) {
	const { size, variant } = props;
	return (
		<>
			<svg
				className={cn("", variants({ variant }))}
				width={cn(sizes({ size }))}
				height={cn(sizes({ size }))}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none">
				<path
					d="M5.13698 13.7347L11.4575 19.6722C11.6454 19.8487 11.7393 19.9369 11.8459 19.9715C11.9461 20.0039 12.0539 20.0039 12.1541 19.9715C12.2607 19.9369 12.3546 19.8487 12.5425 19.6722L18.863 13.7347C20.6414 12.0642 20.8573 9.31509 19.3616 7.38734L19.0804 7.02486C17.2912 4.71871 13.6997 5.10547 12.4424 7.73968C12.2648 8.11178 11.7352 8.11178 11.5576 7.73968C10.3003 5.10547 6.70884 4.71871 4.91959 7.02485L4.63835 7.38733C3.14268 9.31509 3.35864 12.0642 5.13698 13.7347Z"
					stroke="currentColor"
				/>
			</svg>
		</>
	);
}
