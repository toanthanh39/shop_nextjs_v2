"use client";
// import DevComponents from "@/features/dev/fixed/DevComponents";
import PrelineScriptWrapper from "@/components/scripts/prelineScriptWrapper";

import { RootProviderProps, ShopProviderProps } from "@/types/Shop.type";
import dynamic from "next/dynamic";
const DevComponents = dynamic(
	() => import("@/features/dev/fixed/DevComponents"),
	{
		ssr: false,
	}
);

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
	return (
		<>
			{children}
			<DevComponents />
			<PrelineScriptWrapper />
		</>
	);
}
