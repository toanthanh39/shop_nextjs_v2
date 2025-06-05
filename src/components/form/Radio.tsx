import React from "react";
import { RadioBox } from "@/components/ui/Input";
import { ComProps } from "@/types/Component";
import { cn } from "@/utils/utils";

interface RadioProps extends ComProps {
	name?: string;
	options: {
		value: string | number;
		label: string | React.ReactNode;
		id: string | number;
		className?: string;
	}[];
}

export default function Radio({
	name,
	options,
	className,
	...props
}: RadioProps) {
	return (
		<div className={cn("flex gap-2 w-auto", className)}>
			{options.map((option, index) => (
				<RadioBox
					id={option.id.toString()}
					variant="default"
					key={index}
					name={name}
					{...props}
					value={option.value}
					label={option.label}
					className={cn("w-fit", option.className)}
				/>
			))}
		</div>
	);
}
