import Helper from "@/utils/helper";
import { cn } from "@/utils/utils";
import React from "react";
import Text, { PProps } from "./Text";

export type MoneyProps = PProps & {
	value: number;
	minus?: string;
};

export default function Money({
	value,
	className,
	minus,
	...props
}: MoneyProps) {
	return (
		<Text
			as="span"
			variant="default"
			size="sm"
			weight="bold"
			className={cn(className)}
			{...props}>
			{minus && minus}
			{Helper.moneyFormat(value)}đ
		</Text>
	);
}
