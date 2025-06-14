"use server";

import { signIn, signOut } from "@/lib/next-authen/authenOption";

export const onSignOutAction = async (callbackUrl?: string) => {
	// This is a server action, so you can perform server-side operations here.
	// For example, you might want to clear user session or perform any cleanup.
	// If you're using NextAuth, you can use the signOut function from next-auth/react.

	// Example:
	// await signOut({ redirect: false });

	// Return a response or redirect as needed.
	await signOut({ redirect: false, redirectTo: callbackUrl });
	// revalidatePath("/");
	// redirect("/");
};

export const onCredentialSignInAction = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const res = await signIn("credentials", {
		account_id: email,
		password,
		callbackUrl: "/",
	});
};

export const onGoogleSignInAction = async () => {
	await signIn("credentials", {
		redirect: true,
		redirectTo: "/",
	});
};
