"use client";
import { usePathname } from "next/navigation";

import { ComProps } from "@/types/Component";

import { HeartIcon, LogoIcon, SearchIcon, UserIcon } from "@/components/icons";
import Flex from "@/components/ui/Flex";
import Text from "@/components/ui/Text";

import { cn } from "@/utils/utils";


type Props = ComProps;
export default function HeaderNavigation({ className }: Props) {
	const pathname = usePathname();
	const items = [
		{ title: "Home", icon: <LogoIcon.Square />, link: "/" },
		{ title: "Tìm kiếm", icon: <SearchIcon />, link: "/search" },
		{ title: "Thương hiệu", icon: <HeartIcon />, link: "brands" },
		{ title: "Yêu thích", icon: <HeartIcon />, link: "/wishlist" },
		{ title: "Tài khoản", icon: <UserIcon />, link: "/account" },
	];

	const checkActive = (link: string) => {
		return pathname === link;
	};
	const isHide = pathname.includes("/cart");
	return (
		<div
			className={cn(
				"block lg:hidden fixed z-header bottom-0 left-0 right-0 w-full px-2  bg-white shadow-md shadow-colors-gray-5",
				className,
				{
					hidden: isHide,
				}
			)}>
			<Flex
				as="ul"
				align="center"
				justify="evenly"
				gap={2}
				className="min-h-14">
				{items.map((item, index) => {
					const isActive = checkActive(item.link);
					const variant = isActive ? "primary" : "default";
					return (
						<Flex
							direction="col"
							as="li"
							className=" text-white "
							justify="center"
							align="center"
							key={index + 1}>
							<Text as="span" variant={variant}>
								{item.icon}
							</Text>
							<Text
								as="span"
								variant={variant}
								size="sm"
								className="whitespace-nowrap">
								{item.title}
							</Text>
						</Flex>
					);
				})}
			</Flex>
		</div>
	);
}
