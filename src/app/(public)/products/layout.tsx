import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import Main from "@/components/layouts/main";
import { ChildrenProps } from "@/types/Dynamic.type";

export default function Layout({ children }: ChildrenProps) {
	return (
		<>
			<Header />
			<Main>{children}</Main>
			<Footer />
		</>
	);
}
