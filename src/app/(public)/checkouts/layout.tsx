import { ReactNode } from "react";

import { CheckoutHeader } from "@/features/checkout/layout";

import Main from "@/components/layouts/main";

export default async function Layout({ children }: { children: ReactNode }) {
	return (
		<Main useContainer={false}>
			<CheckoutHeader />
			<section className="container mt-6 min-h-screen">{children}</section>
		</Main>
	);
}
