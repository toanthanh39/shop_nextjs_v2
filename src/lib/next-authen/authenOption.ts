import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
	providers: [
		CredentialsProvider({
			// The name to display on the sign-in form (e.g., 'Sign in with...')
			name: "Credentials",
			id: "provider-unique-id",
			type: "credentials",

			// The credentials is used to generate a credential input form on the sign-in page
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials, req) {
				if (!credentials) {
					return null;
				}

				const user: User = {
					id: "1",
					name: "J Smith",
					email: "jsmith@example.com",
				};

				if (
					credentials.username === "jsmith" &&
					credentials.password === "password123"
				) {
					// If you find the user return user object
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;
				}
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
		async session({ session, token }) {
			return session;
		},
	},
	// You can add additional options here
	pages: {
		signIn: "/account/login",
		error: "/account/error",
	},
});
