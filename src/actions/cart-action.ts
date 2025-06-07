"use server";


export const signUpAction = async (formData: FormData) => {
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	if (!email || !password) {
		// return encodedRedirect({
		// 	query: { error: "Email and password are required" },
		// 	path: "/sign-up",
		// 	prefix: "?",
		// });
	}
};

export async function submitFormData(data: any): Promise<{ error?: string }> {
	"use server";

	try {
		// Xử lý dữ liệu ở phía server
		console.log("Server action received:", data);
		// Giả lập API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		return {}; // Thành công
	} catch (error) {
		return { error: "Lỗi khi xử lý dữ liệu" };
	}
}
