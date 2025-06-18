"use client";
import { signIn } from "next-auth/react";

import { UserIcon } from "@/components/icons";
import { Text } from "@/components/ui";

export default function SignInButton() {
	const onSignIn = async () => {
		await signIn("credentials", {
			redirect: true,
			redirectTo: window.location.pathname,
		});
	};
	return (
		// <form
		// 	action={async () => {
		// 		"use server";
		// 		await signIn();
		// 	}}>
		// 	<button type="submit">Sign in</button>
		// </form>

		<Text
			onClick={onSignIn}
			as="span"
			className="w-full whitespace-nowrap flex items-center gap-2 cursor-pointer justify-center"
			tabIndex={0}
			aria-label="Login">
			<UserIcon size="md" />
			Đăng nhập
		</Text>
	);
}
