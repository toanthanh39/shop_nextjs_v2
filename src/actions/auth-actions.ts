"use server";

import { signIn, signOut } from "@/lib/next-authen/authenOption";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const onSignOutAction = async () => {
	"use server";

	// This is a server action, so you can perform server-side operations here.
	// For example, you might want to clear user session or perform any cleanup.
	// If you're using NextAuth, you can use the signOut function from next-auth/react.

	// Example:
	// await signOut({ redirect: false });

	// Return a response or redirect as needed.
	await signOut({ redirect: "/" });
	revalidatePath("/");
	redirect("/");
};

export const onCredentialSignInAction = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	const res = await signIn({
		email,
		password,
		callbackUrl: "/",
	});
};

export const onGoogleSignInAction = async () => {
	await signIn("google", {
		callbackUrl: "/", // Đặt URL bạn muốn chuyển hướng đến sau khi đăng nhập thành công
		// Bạn có thể đặt bất kỳ path nào, ví dụ: '/dashboard', '/profile'
		// Nếu bạn muốn giữ lại URL người dùng đang truy cập trước khi đăng nhập:
		// callbackUrl: window.location.href (dùng nếu bạn đang gọi signIn từ một page bất kỳ)
	});
};
