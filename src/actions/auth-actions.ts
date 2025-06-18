"use server";

import BaseApi from "@/lib/axios/BaseApi";
import { signIn, signOut } from "@/lib/next-authen/authenOption";
import AuthRepo from "@/services/api/repositories/AuthRepo";
import { LoginPostJson } from "@/types/Auth.type";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export const onSignOutAction = async (callbackUrl?: string) => {
	// This is a server action, so you can perform server-side operations here.
	// For example, you might want to clear user session or perform any cleanup.
	// If you're using NextAuth, you can use the signOut function from next-auth/react.

	// Example:
	// await signOut({ redirect: false });

	// Return a response or redirect as needed.
	await signOut({ redirect: true, redirectTo: callbackUrl });
	revalidatePath("/");
	redirect("/");
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

export const onServerLogin = async (formData: LoginPostJson) => {
	console.log("🚀 ~ onServerLogin ~ formData:", formData);
	// const email = formData.get("email") as string;
	// const password = formData.get("password") as string;
	try {
		const resLogin = await new AuthRepo().login({
			account_id: formData.account_id,
			password: formData.password,
		});
		// return resLogin;

		await signIn("credentials", {
			accountid: formData.account_id, // <-- LƯU Ý: Đây có phải là tên đúng trong credentials config không?
			password: formData.password,
			dataLogin: JSON.stringify(resLogin),
			// redirect: true, // <-- Đã thiết lập đúng để NextAuth tự động redirect
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
		return BaseApi.handleError(error);

		// Để có thể dùng useFormState trên client, Server Action phải return một giá trị.
		// Nếu bạn muốn hiển thị toast lỗi, hãy trả về thông báo lỗi ở đây.
	}
};
