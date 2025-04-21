import Main from "@/components/layouts/main";
import { CheckoutHeader } from "@/features/checkout/layout";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
	return (
		<Main useContainer={false}>
			<CheckoutHeader />
			<section className="container mt-6 min-h-screen">{children}</section>
		</Main>
	);
}
