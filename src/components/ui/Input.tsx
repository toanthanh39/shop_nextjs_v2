import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/utils/utils";

import Flex from "./Flex";

const inputVariants = cva(
	"h-full py-1 px-3 relative max-w-100 w-full rounded-sm text-center ",
	{
		variants: {
			variant: {
				default: "border-none",
				border: "border border-gray-300",
				line: "border-b border-gray-300 rounded-none px-0",
			},
			size: {
				default: "text-sm",
				lg: "",
				sm: "",
			},
		},
		defaultVariants: {
			variant: "border",
			size: "default",
		},
	}
);

interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof inputVariants> {
	addonBefore?: React.ReactNode;
	loading?: boolean;
	alowClear?: boolean;
	addonAffter?: React.ReactNode;
}

export default function Input(props: InputProps) {
	const { variant, size, className, addonBefore, addonAffter, ...prop } = props;
	return (
		<Flex
			align="center"
			className={cn(inputVariants({ variant, size, className }))}>
			{addonBefore && addonBefore}
			<input
				{...prop}
				className="flex-1 outline-none h-full w-full border-none py-1"
			/>
			{addonAffter ? addonAffter : null}
		</Flex>
	);
}

// Add Select component
interface SelectProps
	extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
		VariantProps<typeof inputVariants> {
	options: { value: string | number; label: string }[];
	placeholder?: string;
}

export function Select({
	options,
	variant,
	size,
	className,
	placeholder,
	...props
}: SelectProps) {
	return (
		<Flex
			align="center"
			className={cn(inputVariants({ variant, size, className }))}>
			<select
				{...props}
				defaultValue={props?.defaultValue ?? ""}
				className="flex-1 outline-none h-full w-full border-none py-1 ">
				{placeholder && (
					<option disabled value={""}>
						{placeholder}
					</option>
				)}

				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</Flex>
	);
}

// Add RadioBox component
interface RadioBoxProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof inputVariants> {
	label: React.ReactNode;
}

export function RadioBox({
	label,
	variant,
	size,
	className,
	...props
}: RadioBoxProps) {
	return (
		<Flex
			align="center"
			className={cn(inputVariants({ variant, size, className }), className)}>
			<input
				type="radio"
				{...props}
				className="outline-none border-none py-1"
			/>
			<label
				className={cn(
					"ml-2 cursor-pointer select-none",
					props.disabled && "cursor-not-allowed"
				)}
				htmlFor={props.id}>
				{label}
			</label>
		</Flex>
	);
}
