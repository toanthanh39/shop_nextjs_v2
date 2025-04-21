import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import Main from "@/components/layouts/main";

export default function Layout({ children }) {
	return (
		<>
			<Header />
			<Main>{children}</Main>
			<Footer />
		</>
	);
}
