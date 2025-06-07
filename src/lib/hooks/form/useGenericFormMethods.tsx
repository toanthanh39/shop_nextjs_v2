// hooks/useGenericFormMethods.ts
import { zodResolver } from "@hookform/resolvers/zod";
import {
	useForm,
	UseFormReturn,
	FieldValues,
	UseFormProps,
} from "react-hook-form";
import { ZodSchema } from "zod";

type UseGenericFormMethodsOptions<T extends FieldValues> = {
	defaultValues: UseFormProps<T>["defaultValues"];
	validationSchema: ZodSchema<T>;
	mode?: "onSubmit" | "onChange" | "onBlur" | "all";
	reValidateMode?: "onChange" | "onBlur" | "onSubmit";
};

function useGenericFormMethods<T extends FieldValues>(
	options: UseGenericFormMethodsOptions<T>
): UseFormReturn<T> {
	const {
		defaultValues,
		mode = "onBlur",
		reValidateMode = "onChange",
		validationSchema,
	} = options;

	const methods = useForm<T>({
		defaultValues,
		mode,
		reValidateMode,
		resolver: zodResolver(validationSchema),
	});

	return methods;
}

export default useGenericFormMethods;
