import Body from "@/features/home/body";

import Header from "@/components/layouts/header";
import Main from "@/components/layouts/main";
import Footer from "@/components/layouts/footer";

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
