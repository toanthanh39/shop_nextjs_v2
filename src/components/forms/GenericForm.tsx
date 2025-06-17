"use client";

import Form, { FormProps } from "next/form";
import React from "react";
/* eslint-disable import/named */
import {
	FormProvider,
	UseFormReturn,
	FieldValues,
	useFormContext,
} from "react-hook-form";

import { ComProps } from "@/types/Component";

import { cn } from "@/utils/utils";

import { Button, Text } from "../ui";
import { ButtonProps } from "../ui/Button";

type GenericFormProps<T extends FieldValues> = ComProps &
	Partial<FormProps> & {
		methods: UseFormReturn<T>; // These methods are created outside
		onSubmit?: React.FormEventHandler<HTMLFormElement>;
	};

export default function GenericForm<T extends FieldValues>({
	methods,
	children,
	onSubmit = () => {},
	className,
	prefetch,
	action,
}: GenericFormProps<T>) {
	return (
		<FormProvider {...methods}>
			<Form
				action={action ?? ""}
				prefetch={prefetch}
				className={cn("", className)}
				onSubmit={!action ? onSubmit : undefined}>
				{children}
			</Form>
		</FormProvider>
	);
}

// InputField Component
type InputFieldProps = ComProps & {
	name: string;
	label?: string;
	required?: boolean;
};

GenericForm.Item = function Item({
	name,
	label,
	children,
	className,
	required = false,
	disabled,
}: InputFieldProps) {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const errorFields = { ...errors } as any;

	return (
		<div className={cn("w-full", className)}>
			{label && (
				<label className="text-colors-gray-5 text-xs">
					{label} {required && <span className="text-red-500">*</span>}
				</label>
			)}
			<div>
				{React.Children.map(children, (child) => {
					if (React.isValidElement(child)) {
						return React.cloneElement(child, {
							...register(name, { disabled: disabled }),
							...(child.props as object),
							onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
								register(name, { disabled: disabled }).onChange(e);
								(child.props as any).onChange?.(e);
							},
						} as any);
					}
					return child;
				})}
			</div>
			{errors[name] && (
				<Text.small style={{ color: "red" }}>
					{errorFields?.[name]?.message}
				</Text.small>
			)}
		</div>
	);
};

type FormSubmitProps = ComProps & ButtonProps & {};

GenericForm.Submit = function ({ className, ...props }: FormSubmitProps) {
	return (
		<Button
			className={cn("mt-2", className)}
			type="submit"
			variant="primary"
			{...props}>
			{props?.children ?? "Submit"}
		</Button>
	);
};
GenericForm.Submit.displayName = "GenericFormSubmit";

GenericForm.Reset = function ({ className }: ComProps) {
	const { reset } = useFormContext();
	return (
		<Button
			onClick={() => reset()}
			className={cn("mt-2", className)}
			type="reset"
			variant="secondary">
			Reset
		</Button>
	);
};

GenericForm.Reset.displayName = "GenericFormReset";
