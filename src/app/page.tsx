import Body from "@/features/home/body";

import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import Main from "@/components/layouts/main";

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
