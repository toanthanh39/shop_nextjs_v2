"use client";
import { useSession } from "next-auth/react";

import { UserIcon } from "@/components/icons";
import { LinkElement, Space, Text } from "@/components/ui";
import Flex from "@/components/ui/Flex";
import { SignOutButton, SignInButton } from "@/features/auth";

export default function HeaderAuthen() {
	const { data: session, status } = useSession();

	const isAauthenticated = session?.user !== undefined;
	// Xử lý đăng xuất ở đây, ví dụ gọi API hoặc xóa token
	// if (session) {
	// 	return (
	// 		<div className="relative group pr-4 flex-1 basis-[120px] border-r border-colors-gray-2 ">
	// 			<Text.span
	// 				className="w-full whitespace-nowrap flex items-center gap-2 cursor-pointer justify-center"
	// 				tabIndex={0}
	// 				aria-label="Login">
	// 				<UserIcon size="md" />
	// 				{session.user.name}
	// 			</Text.span>
	// 		</div>
	// 	);
	// }

	return (
		<div className="relative group pr-4 flex-1 basis-[120px] border-r border-colors-gray-2 ">
			<Space>
				{/* {!isAauthenticated && <SignInButton></SignInButton>} */}

				{!isAauthenticated && (
					<LinkElement
						href="/login"
						className="w-full whitespace-nowrap flex items-center gap-2 cursor-pointer justify-center">
						<UserIcon size="md" />
						Đăng nhập
					</LinkElement>
				)}

				{isAauthenticated && (
					<>
						<Text
							as="span"
							className="w-full whitespace-nowrap flex items-center gap-2 cursor-pointer justify-center"
							tabIndex={0}
							aria-label="Login">
							<UserIcon size="md" />
							{session?.user?.user.full_name}
						</Text>

						<Flex
							direction="col"
							gap={16}
							className="group-hover:visible invisible absolute  left-0  p-4  z-header  top-full right-auto -translate-x-1/4 w-max  bg-white border border-colors-gray-2 shadow-lg">
							<SignOutButton></SignOutButton>
						</Flex>
					</>
				)}
			</Space>
		</div>
	);
}
