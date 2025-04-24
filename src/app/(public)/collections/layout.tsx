import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import Main from "@/components/layouts/main";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<Main>{children}</Main>
			<Footer />
		</>
	);
}
