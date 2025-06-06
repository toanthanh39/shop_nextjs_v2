import * as React from "react";

import { ComDataSource , ComProps } from "@/types/Component";

import { cn } from "@/utils/utils";

import { EmptyIcon } from "../icons";
import { EmptyIconProps } from "../icons/EmptyIcon";

import Flex from "./Flex";
import Text from "./Text";



// const variants = cva("relative cursor-pointer", {
// 	variants: {
// 		variant: {
// 			default: "",
// 		},
// 	},
// 	defaultVariants: {
// 		variant: "default",
// 	},
// });

export interface EmptyProps
	extends EmptyIconProps,
		ComProps,
		ComDataSource<any> {
	title?: React.ReactNode;
}

export default function Empty({
	className,
	variant,
	dataSource,
	children,
	size,
	title = (
		<Text as="span" size="sm">
			Chưa có dữ liệu
		</Text>
	),
	...props
}: EmptyProps) {
	if (dataSource.length) {
		return <>{children}</>;
	}
	return (
		<Flex direction="col" align="center" className={cn(className)} {...props}>
			<EmptyIcon variant={variant} size={size} />
			{title}
		</Flex>
	);
}
