import Menu from "./components/Menu";

import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

export default function Header() {
	return (
		<header className="relative">
			<HeaderDesktop />
			<HeaderMobile />
			<Menu />
		</header>
	);
}
