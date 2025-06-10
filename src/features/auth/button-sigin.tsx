import { signIn } from "@/lib/next-authen/authenOption";

export function SignInButton() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn();
			}}>
			<button type="submit">Sign in</button>
		</form>
	);
}
