"use client";
import { RootProviderProps , ShopProviderProps } from "@/types/Shop.type";


type Props = ShopProviderProps & RootProviderProps & {};

export default function ShopProvider({ children }: Props) {
	// useLayoutEffect(() => {
	// 	if (window.location.pathname !== "/") {
	// 		return;
	// 	}
	// 	const handleScroll = () => {
	// 		const currentScrollY = window.scrollY;
	// 		const headerMid = document.getElementById("headerMid");
	// 		if (currentScrollY > 200 && headerMid) {
	// 			headerMid.classList.add("headerFixed");
	// 		} else if (currentScrollY <= 150 && headerMid) {
	// 			headerMid.classList.remove("headerFixed");
	// 		}
	// 	};

	// 	const debouncedHandleScroll = debounce(handleScroll, 100);

	// 	window.addEventListener("scroll", debouncedHandleScroll);

	// 	return () => {
	// 		window.removeEventListener("scroll", debouncedHandleScroll);
	// 	};
	// }, []);
	return <>{children}</>;
}
