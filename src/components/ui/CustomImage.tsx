import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export interface CustomImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	layout?: "fixed" | "responsive" | "fill" | "intrinsic";
	className?: string;
	quality?: number | `${number}`;
	priority?: boolean;
	loading?: "eager" | "lazy";
	placeholder?: PlaceholderValue;
	blurDataURL?: string;
	objectFit?: string;
	objectPosition?: string;
}

const getValidSrc = (src: string, defaultImage: any) => {
	if (typeof src !== "string") {
		return defaultImage;
	}

	if (src.length === 0) {
		return defaultImage;
	}

	const isExternalOrAsset =
		src.includes("https") || src.includes("http") || src.includes("/assets");
	return isExternalOrAsset
		? src
		: `${process.env.NEXT_PUBLIC_API_ASSET_URL}/uploads/filecloud/${src}`;
};

const DEFAULT_IMAGE = "/assets/images/default.png";
export default function CustomImage(props: CustomImageProps) {
	const srcImage = getValidSrc(props.src, DEFAULT_IMAGE);

	return <Image {...props} src={srcImage}></Image>;
}
