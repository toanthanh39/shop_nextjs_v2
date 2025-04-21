"use client";
import { usePathname, useRouter } from "next/navigation";
import LinkElement from "../ui/Link";
import { LinkElementProps } from "../ui/Link";

export default function NavLink(props: LinkElementProps) {
	const pathname = usePathname();
	const isActive = pathname === props.href;
	return (
		<LinkElement
			{...props}
			variant={isActive ? "active" : props.variant}></LinkElement>
	);
}
