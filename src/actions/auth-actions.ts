"use server";

import BaseApi from "@/lib/axios/BaseApi";
import { signIn, signOut } from "@/lib/next-authen/authenOption";
import AuthRepo from "@/services/api/repositories/AuthRepo";
import { LoginPostJson } from "@/types/Auth.type";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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

export const onServerLogin = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	try {
		// ... (Phần code call API BE đã comment)

		const res = await signIn("credentials", {
			accountid: email, // <-- LƯU Ý: Đây có phải là tên đúng trong credentials config không?
			password: password,
			redirect: true, // <-- Đã thiết lập đúng để NextAuth tự động redirect
			redirectTo: "/", // <-- NextAuth sẽ chuyển hướng tới đây
			// callbackUrl: "/", // <-- Thường dùng cho các flow OAuth, không cần thiết khi redirect: true và redirectTo đã có
		});

		// Quan trọng: Bất kỳ code nào sau await signIn(...) sẽ không được thực thi
		// nếu signIn thành công và NextAuth thực hiện redirect.
		// Nếu bạn muốn trả về một giá trị nào đó cho useFormState() trên client
		// (ví dụ: một thông báo thành công) thì bạn cần phải không đặt redirect: true,
		// và thay vào đó dùng redirect() từ next/navigation thủ công.
	} catch (error) {
		if (isRedirectError(error)) {
			// Nếu đây là lỗi redirect, Next.js đã xử lý chuyển hướng rồi.
			// Chỉ re-throw để Next.js tiếp tục xử lý mà không ghi log lỗi không cần thiết
			// hoặc hiển thị thông báo lỗi sai trên client.
			throw error;
		}
		// Đây là nơi bạn bắt các lỗi từ quá trình signIn (ví dụ: xác thực credentials thất bại)
		// NextAuth.js ném một lỗi nếu đăng nhập không thành công.
		// Bạn cần trả về một object mà useFormState có thể xử lý trên client.

		// Giả định BaseApi.handleError trả về một object { success: boolean, message: string, code?: string }
		// Nếu không, bạn cần điều chỉnh để nó trả về định dạng đó.
		const handledError = BaseApi.handleError(error);

		// Để có thể dùng useFormState trên client, Server Action phải return một giá trị.
		// Nếu bạn muốn hiển thị toast lỗi, hãy trả về thông báo lỗi ở đây.
		return {
			success: false,
			message:
				handledError?.errors?.[0] ||
				"Đã xảy ra lỗi không mong muốn trong quá trình đăng nhập.",
			code:
				(error as any)?.type === "CredentialsSignin"
					? "INVALID_CREDENTIALS"
					: "UNKNOWN_ERROR", // Ví dụ
		};
	}
};
