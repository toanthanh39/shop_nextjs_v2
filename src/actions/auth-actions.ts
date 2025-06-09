"use server";

import { signOut } from "@/lib/next-authen/authenOption";

export const onSignOutAction = async () => {
	"use server";

	// This is a server action, so you can perform server-side operations here.
	// For example, you might want to clear user session or perform any cleanup.
	// If you're using NextAuth, you can use the signOut function from next-auth/react.

	// Example:
	// await signOut({ redirect: false });

	// Return a response or redirect as needed.
	await signOut({ redirect: "/" });
	// redirect("/");
};
