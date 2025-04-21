import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import Main from "@/components/layouts/main";
import Body from "@/features/home/body";

export default function Home() {
	return (
		<>
			<Header />
			<Main useContainer={false}>
				<Body />
			</Main>
			<Footer />
		</>
	);
}
