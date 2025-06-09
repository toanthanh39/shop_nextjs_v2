"use client";
import { useState } from "react";

import { signIn } from "@/lib/next-authen/authenOption";
// import { signIn } from "next-auth/react";

export default function LoginPage() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(formData: FormData) {
		setLoading(true);
		setError("");
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		const res = await signIn("credentials", {
			email,
			password,
			callbackUrl: "/",
		});

		setLoading(false);

		if (res?.error) {
			setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
		} else if (res?.ok) {
			// window.location.href = "/";
		}
	}

	const handleGoogleLogin = () => {
		setLoading(true);
		signIn("google", { callbackUrl: "/" });
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
			<form
				action={handleGoogleLogin}
				className="bg-white/80 shadow-xl rounded-3xl p-8 w-full max-w-md flex flex-col gap-6
					border border-white/40
					[box-shadow:8px_8px_24px_#d1d5db,_-8px_-8px_24px_#f3f4f6]
					"
				style={{
					backdropFilter: "blur(12px)",
				}}>
				<h2 className="text-3xl font-bold text-center text-purple-700 mb-2">
					Đăng nhập
				</h2>
				<div className="flex flex-col gap-2">
					<label htmlFor="email" className="text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						className="rounded-xl px-4 py-2 bg-white/60 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner transition
							[box-shadow:inset_4px_4px_12px_#e0e7ff,inset_-4px_-4px_12px_#fff]"
						autoComplete="email"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label
						htmlFor="password"
						className="text-sm font-medium text-gray-700">
						Mật khẩu
					</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						className="rounded-xl px-4 py-2 bg-white/60 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner transition
							[box-shadow:inset_4px_4px_12px_#e0e7ff,inset_-4px_-4px_12px_#fff]"
						autoComplete="current-password"
					/>
				</div>
				{error && (
					<div className="text-red-500 text-sm text-center">{error}</div>
				)}
				<button
					type="submit"
					disabled={loading}
					className="mt-2 rounded-xl bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold py-2 shadow-lg hover:from-purple-500 hover:to-blue-500 transition
						[box-shadow:4px_4px_16px_#c7d2fe,-4px_-4px_16px_#f3e8ff]">
					{loading ? "Đang đăng nhập..." : "Đăng nhập"}
				</button>
				<div className="flex items-center my-2">
					<hr className="flex-grow border-gray-300" />
					<span className="mx-2 text-gray-400 text-sm">hoặc</span>
					<hr className="flex-grow border-gray-300" />
				</div>

				<button
					type="button"
					onClick={handleGoogleLogin}
					disabled={loading}
					className="rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold py-2 shadow hover:bg-gray-100 flex items-center justify-center gap-2 transition">
					<img src="/google.svg" alt="Google" className="w-5 h-5" />
					Đăng nhập với Google
				</button>
			</form>
		</div>
	);
}
