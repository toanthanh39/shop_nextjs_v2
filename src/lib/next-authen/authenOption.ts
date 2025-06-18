import NextAuth, { CredentialsSignin, type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import BaseApi from "../axios/BaseApi";
declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's postal address. */
			jwt: string;
			user: {
				company_id: number;
				id: number;
				full_name: string;
				screenname: string;
				avatar_file_id: number;
				avatar: {
					company_id: number;
					creator_id: number;
					id: number;
					directory_id: number;
					object_type: number;
					object_id: number;
					md5_hash: string;
					file_path: string;
					width: number;
					height: number;
					randomcode: string;
					title: string;
					description: string;
					extension: string;
					size_in_byte: number;
					origin: string;
					status: number;
					is_directory: number;
					ip_address: number;
					date_created: number;
					date_modified: number;
					url: string;
				};
				date_created: number;
				date_modified: number;
				date_last_login: number;
			};
			role: string;
			status: any;
			company: {
				id: number;
				owner: number;
				name: string;
				screenname: string;
				domain: string;
				email: string;
				phone: string;
				region: number;
				status: number;
				kyc_status: number;
				quota: [];
				base_quota: {
					_base_: number;
					warehouse: number;
					store: number;
					office: number;
					worktrackingrangeperoffice: number;
					shippinghub: number;
					apikey: number;
					echannel: number;
					productcategory: number;
					shippingmerchant: number;
					product: number;
					productvariant: number;
					filedisk: number;
				};
				customer: {
					id: number;
					email: string;
					phone: string;
					status: number;
				};
				employee?: {
					id: number;
					kyc_status: number;
					name: string;
					owner: number;
					phone: string;
					quota: any[]; // Nếu bạn biết rõ kiểu dữ liệu trong mảng quota, hãy thay thế "any" bằng kiểu phù hợp.
					region: number;
					screenname: string;
					status: number;
					department_id: number;
				};
			};
		} & DefaultSession["user"];
	}
}

class InvalidLoginError extends CredentialsSignin {
	code = this.message;
}

// --- Định nghĩa class lỗi tùy chỉnh (đặt ở một file riêng như types/errors.ts nếu dùng nhiều) ---
class AuthError extends Error {
	constructor(
		message: string,
		public code: string = "GENERIC_AUTH_ERROR"
	) {
		super(message);
		this.name = "AuthError";
	}
}
// --- Hết định nghĩa lỗi ---
export const { auth, handlers, signIn, signOut } = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				accountid: { label: "Account ID", type: "text" },
				password: { label: "Password", type: "password" },
				dataLogin: { label: "Pre-filled Data", type: "hidden", optional: true },
			},
			async authorize(credentials) {
				let user: any;
				if (!credentials || !credentials.accountid) {
					throw new AuthError(
						"Tên đăng nhập hoặc mật khẩu không được để trống.",
						"MISSING_CREDENTIALS"
					);
				}

				try {
					if (credentials?.dataLogin) {
						const prefilledUser = JSON.parse(credentials.dataLogin as string);
						if (prefilledUser && prefilledUser.id) {
							return prefilledUser;
						}
					} else {
						const res = await fetch(
							`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/customer/login`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									account_id: credentials?.accountid || "",
									password: credentials?.password || "",
									platform: 1,
									hostname: process.env.NEXT_PUBLIC_API_HOST_ADMIN,
									version: "1.0.0",
								}),
							}
						);

						const resJson = await res.json();

						const errors = BaseApi.handleError(resJson); // <-- Cách xử lý lỗi này có vẻ không phù hợp ở đây

						if (res.ok) {
							user = resJson;
							return user;
						} else {
							// throw new InvalidLoginError(errors.errors?.[0] || ""); // <-- InvalidLoginError cần được định nghĩa

							throw new AuthError(
								errors?.[0] ?? "error_unknow",
								resJson?.code || "LOGIN_FAILED"
							);
						}
					}
				} catch (error) {
					if (error instanceof AuthError) {
						throw error; // Ném lại lỗi AuthError để truyền message và code
					}
					// Xử lý lỗi Axios hoặc Fetch API khác
					const apiError = BaseApi.handleError(error); // Giả định BaseApi.handleError trả về { message: string }
					throw new AuthError(
						apiError?.message || "Lỗi kết nối đến máy chủ xác thực.",
						"API_CONNECTION_ERROR"
					);
				}
			},
		}),

		GoogleProvider({
			clientId: process.env.AUTH_GOOGLE_ID || "",
			clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],

	callbacks: {
		async jwt({ token, user, profile }) {
			if (user) {
				token.id = user.id;
			}
			return { ...token, ...user };
		},
		async session({ session, token, user }) {
			session.user = token;
			return { ...session };
		},

		async callback({ session, user, token }) {
			if (user) {
				session.user = user;
			}
			if (token) {
				session.jwt = token;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
		// error: "/error",
		// error: "/login?error",
	},
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // Kích hoạt thời gian sống tối đa của session (tùy chọn)
	},
	secret: process.env.NEXTAUTH_SECRET,
});
