"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { z } from "zod";

import GenericForm from "@/components/forms/GenericForm";

import useGenericFormMethods from "@/lib/hooks/form/useGenericFormMethods";
import { Button, Heading, Input, Space } from "@/components/ui";
import Toast from "@/components/ui/preline/Toast";
import { toast } from "sonner";
import { onServerLogin } from "@/actions/auth-actions";
import { useFormState } from "react-dom";
import AuthRepo from "@/services/api/repositories/AuthRepo";
import BaseApi from "@/lib/axios/BaseApi";
import { useTranslations } from "next-intl";
// import { signIn } from "next-auth/react";

export default function LoginForm() {
	const tError = useTranslations("auth.errors");

	// ---form config
	const validationSchema = z.object({
		email: z.string().min(1, "First name is required"),
		password: z.string().min(1, "Last name is required"),
	});

	type FormData = z.infer<typeof validationSchema>;

	const defaultValues: FormData = {
		email: "",
		password: "",
	};

	const methods = useGenericFormMethods({
		defaultValues: defaultValues,
		validationSchema: validationSchema,
		mode: "onChange",
	});
	// --- end form config ---

	const [formState, setFormState] = useState({
		errors: [],
		loading: false,
	});

	////////////////////////////////////////////

	async function onSubmit(formData: FormData) {
		const { email, password } = formData;
		setFormState((prev) => ({ ...prev, loading: true }));
		try {
			const resLogin = await new AuthRepo().login({
				account_id: email,
				password: password,
			});

			if (resLogin.status === "SUCCESS") {
				await signIn("credentials", {
					accountid: email,
					password: formData.password,
					dataLogin: JSON.stringify(resLogin),
					redirect: true,
					redirectTo: "/",
				});
			}

			// const resLogin = await onServerLogin({
			// 	account_id: email,
			// 	password: password,
			// });

			if (BaseApi.isErrorResponse(resLogin)) {
				throw BaseApi.handleError(resLogin);
			}

			// await signIn("credentials", {
			// 	accountid: email,
			// 	password: password,
			// 	dataLogin: JSON.stringify(resLogin),
			// 	redirectTo: "/",
			// 	redirect: true,
			// });
		} catch (error) {
			const { errors } = BaseApi.handleError(error);
			toast(<Toast>{tError(errors?.[0] ?? "error_unknow")}</Toast>, {
				unstyled: true,
			});
			// setLoading(false);
		} finally {
			setFormState((prev) => ({ ...prev, loading: false }));
		}
	}

	const handleGoogleLogin = () => {
		signIn("google", { callbackUrl: "/" });
	};

	return (
		<Space className="min-h-screen flex items-center justify-center">
			<GenericForm
				onSubmit={methods.handleSubmit(onSubmit)}
				// action={onServerLogin}
				methods={methods}
				className="bg-white/80 shadow-xl rounded-3xl p-8 w-full max-w-md flex flex-col gap-6
          border border-white/40
          [box-shadow:8px_8px_24px_#d1d5db,_-8px_-8px_24px_#f3f4f6]
          "
				style={{
					backdropFilter: "blur(12px)",
				}}>
				<Heading level={2}>Đăng nhập</Heading>
				<GenericForm.Item name="email" label="	Email">
					<Input id="email" required autoComplete="email"></Input>
				</GenericForm.Item>
				<GenericForm.Item name="password" label="	Mật khẩu">
					<Input
						id="password"
						type="password"
						required
						autoComplete="current-password"></Input>
				</GenericForm.Item>

				<Button
					block
					type="submit"
					disabled={formState.loading}
					loading={formState.loading}
					variant="primary">
					{formState.loading ? "Đang đăng nhập..." : "Đăng nhập"}
				</Button>
				<div className="flex items-center my-2">
					<hr className="flex-grow border-gray-300" />
					<span className="mx-2 text-gray-400 text-sm">hoặc</span>
					<hr className="flex-grow border-gray-300" />
				</div>

				<Button
					block
					type="button"
					onClick={handleGoogleLogin}
					disabled={formState.loading}
					variant="secondary"
					className="rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold py-2 shadow hover:bg-gray-100 flex items-center justify-center gap-2 transition">
					<img src="/google.svg" alt="Google" className="w-5 h-5" />
					Đăng nhập với Google
				</Button>
			</GenericForm>
		</Space>
	);
}
