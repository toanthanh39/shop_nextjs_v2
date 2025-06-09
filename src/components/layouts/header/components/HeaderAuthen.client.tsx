"use client";

import { UserIcon } from "@/components/icons";
import { Space, Text } from "@/components/ui";
import { useSession } from "next-auth/react";

export default function HeaderAuthenClient() {
	const { data: session, status } = useSession();

	const isAauthenticated = session?.user !== undefined;

	return (
		<Space>
			{!isAauthenticated && (
				<Text
					as="span"
					className="w-full whitespace-nowrap flex items-center gap-2 cursor-pointer justify-center"
					tabIndex={0}
					aria-label="Login">
					<UserIcon size="md" />
					Đăng nhập
				</Text>
			)}

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
		</Space>
	);
}
