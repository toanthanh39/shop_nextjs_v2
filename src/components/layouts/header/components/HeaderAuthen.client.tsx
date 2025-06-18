"use client";

import { useSession } from "next-auth/react";

import { UserIcon } from "@/components/icons";
import { Flex, Space, Text } from "@/components/ui";
import { SignInButton, SignOutButton } from "@/features/auth";

export default function HeaderAuthenClient() {
	const { data: session, status } = useSession();

	const isAauthenticated = session?.user !== undefined;

	return (
		<Space>
			{!isAauthenticated && <SignInButton></SignInButton>}

			{isAauthenticated && (
				<Text
					as="span"
					className="w-full whitespace-nowrap flex items-center gap-2 cursor-pointer justify-center"
					tabIndex={0}
					aria-label="Login">
					<UserIcon size="md" />
					{session?.user?.name}
				</Text>
			)}

			{isAauthenticated && (
				<Flex
					direction="col"
					gap={16}
					className="group-hover:visible invisible absolute  left-0  p-4  z-header  top-full right-auto -translate-x-1/4 w-max  bg-white border border-colors-gray-2 shadow-lg">
					<SignOutButton></SignOutButton>
				</Flex>
			)}
		</Space>
	);
}
