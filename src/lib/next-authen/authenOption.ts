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
export const { auth, handlers, signIn, signOut } = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				accountid: { label: "Account ID", type: "text" },
				password: { label: "Password", type: "password" },

				dataLogin: { label: "Pre-filled Data", type: "hidden", optional: true }, // Dùng cho trường hợp truyền thẳng user object
			},
			async authorize(credentials) {
				// return {
				// 	jwt: "7f8761c5626774ac3124b4d132ff6430",
				// 	user: {
				// 		id: 15626,
				// 		full_name: "Huỳnh Gia Bảo",
				// 		email: "",
				// 		date_created: 1679567466,
				// 		date_modified: 1739175511,
				// 		date_last_login: 1749570789,
				// 	},
				// 	role: "0",
				// 	status: "SUCCESS",
				// 	company: {
				// 		id: 10308,
				// 		owner: 15511,
				// 		name: "namperfume",
				// 		screenname: "admin",
				// 		domain: "admin.namefragrance.vn",
				// 		email: "thanhnam.nguyen@beme.vn",
				// 		phone: "0913579020",
				// 		region: 0,
				// 		status: 1,
				// 		kyc_status: 0,
				// 		quota: [],
				// 		base_quota: {
				// 			_base_: 9223372036854776000,
				// 			warehouse: 9223372036854776000,
				// 			store: 9223372036854776000,
				// 			office: 9223372036854776000,
				// 			shippinghub: 9223372036854776000,
				// 			apikey: 9223372036854776000,
				// 			echannel: 9223372036854776000,
				// 			productcategory: 9223372036854776000,
				// 			product: 9223372036854776000,
				// 			productvariant: 9223372036854776000,
				// 			filedisk: 9223372036854776000,
				// 		},
				// 		customer: {
				// 			id: 99994444,
				// 			email: "bao.huynh@beme.vn",
				// 			phone: "0795803209",
				// 			status: 1,
				// 		},
				// 	},
				// };
				// 1. Kiểm tra credentials hợp lệ
				// const header = await headers();
				let user: any;
				if (!credentials || !credentials.accountid) {
					console.warn("Credentials missing or invalid.");
					return null; // Trả về null nếu không có thông tin đăng nhập cần thiết
				}

				// 2. Xử lý trường hợp `dataLogin` (user object đã có sẵn)
				if (false) {
					try {
						const prefilledUser = JSON.parse(credentials.dataLogin as string);
						// Cần xác minh prefilledUser có hợp lệ không (ví dụ: có id, email, v.v.)
						// Đảm bảo prefilledUser có ít nhất một thuộc tính 'id' để Auth.js có thể sử dụng
						if (prefilledUser && prefilledUser.id) {
							return prefilledUser;
						}
					} catch (e) {
						console.error("Failed to parse dataLogin:", e);
						// Có thể throw lỗi để Auth.js báo lỗi invalid credentials
						throw new Error("Invalid pre-filled login data.");
					}
				}

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
				console.log("🚀 ~ authorize ~ resJson:", resJson);

				const errors = BaseApi.handleError(resJson);

				if (res.ok) {
					user = resJson;
					return user;
				} else {
					throw new InvalidLoginError(errors.errors?.[0] || "");
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
		async jwt({ token, user }) {
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
