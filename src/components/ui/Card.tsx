import { cva, VariantProps } from "class-variance-authority";

import { imageConst } from "@/common/constants/image";
import { cn } from "@/utils/utils";

import CustomImage, { CustomImageProps } from "./CustomImage";
import Skeleton from "./Skeleton";


const CardVariants = cva("", {
	variants: {
		variant: {
			none: "",
			default: "text-colors-gray-5",
			secondary: "text-colors-gray-4",
			primary: "text-colors-red-5",
			link: "text-colors-blue-5 underline-offset-4 hover:underline",
			primaryReverse: "text-whitesmoke",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const Card = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn("relative flex flex-col p-3 gap-3", className)}
		{...props}
	/>
);
Card.displayName = "Card";
////////////////////////////////////////////////////
interface CardImageProps extends CustomImageProps {}
const CardImage = ({ className, ...props }: CardImageProps) => (
	<CustomImage
		className={cn("mx-auto", className)}
		objectFit="cover"
		loading="lazy"
		placeholder="blur"
		{...props}
		blurDataURL={imageConst.blur_url}
	/>
);
CardImage.displayName = "CardImage";

const CardContent = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("", className)} {...props} />
);
CardContent.displayName = "CardContent";

////////////////////////////////////////////////////
const bagdeVariants = cva("absolute z-2 w-fit flex flex-col gap-1", {
	variants: {
		position: {
			top_left: "top-0 left-0",
			top_right: "top-0 right-0",

			bottom_left: "bottom-0 left-0",
			bottom_right: "bottom-0 right-0",

			center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
		},
	},
	defaultVariants: {
		position: "top_left",
	},
});

interface CardBagdeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof bagdeVariants> {}
const CardBagde = ({ className, position, ...props }: CardBagdeProps) =>
	props.children ? (
		<div className={cn(bagdeVariants({ position, className }))} {...props}>
			{props.children}
		</div>
	) : null;
CardBagde.displayName = "CardBagde";
////////////////////////////////////////////////////

const CardSkeleton = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("", className)} {...props}>
		<Skeleton className="h-[183px] md:h-[176px]"></Skeleton>
		<Skeleton className="h-5 mt-2"></Skeleton>
		<Skeleton className="h-3 w-2/3 mt-1"></Skeleton>
		<Skeleton className="h-3 w-1/2 mt-1"></Skeleton>
	</div>
);
CardSkeleton.displayName = "CardSkeleton";

export { Card, CardImage, CardContent, CardBagde, CardSkeleton };
