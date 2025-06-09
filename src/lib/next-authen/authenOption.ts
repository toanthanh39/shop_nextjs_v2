import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			// id: "provider-unique-id",
			// type: "credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "jsmith@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				console.log("🚀 ~ authorize ~ credentials:", credentials);
				if (!credentials) {
					return null;
				}
				const user: User = {
					id: "1",
					name: "J Smith",
					email: "jsmith@example.com",
				};

				return user;

				if (
					credentials.username === "jsmith@example.com" &&
					credentials.password === "password123"
				) {
					return user;
				} else {
					return null;
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return { ...token, ...user };
		},
		async session({ session, token }) {
			return session;
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
		error: "/error",
	},
});
