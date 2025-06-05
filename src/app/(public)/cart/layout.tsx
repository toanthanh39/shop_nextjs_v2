import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import Main from "@/components/layouts/main";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<Main usePadding className="min-h-[80vh] my-4 lg:my-10">
				{children}
			</Main>
			<Footer />
		</>
	);
}
