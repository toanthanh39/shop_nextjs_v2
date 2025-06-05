"use client";
import { UserIcon } from "@/components/icons";
import { Button, Text } from "@/components/ui";
import CustomImage from "@/components/ui/CustomImage";
import Flex from "@/components/ui/Flex";
import { useRouter } from "next/navigation";
export default function HeaderAuthen() {
	const router = useRouter();
	// const { data: session } = useSession();

	const handleRedirect = () => {
		// if (session) {
		// 	router.push("/");
		// } else {
		// 	router.push("/login");
		// }
	};
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
			<Text
				as="span"
				className="w-full whitespace-nowrap flex items-center gap-2 cursor-pointer justify-center"
				tabIndex={0}
				aria-label="Login"
				onClick={handleRedirect}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						handleRedirect();
					}
				}}>
				<UserIcon size="md" />
				Đăng nhập
			</Text>

			<Flex
				direction="col"
				gap={16}
				className="group-hover:visible invisible absolute  left-0  p-4  z-header  top-full right-auto -translate-x-1/4 w-max  bg-white border border-colors-gray-2 shadow-lg">
				<Flex gap={8} align="center">
					<CustomImage src="" alt="user" width={30} height={30}></CustomImage>
					<Flex direction="col" gap={2}>
						<Text.p weight="bold">Chào bạn</Text.p>
						<Text.small>Đăng nhập để tham gia với chúng tôi</Text.small>
					</Flex>
				</Flex>
				<Flex gap={4}>
					<Button className="flex-1" variant="primary">
						Đăng nhập
					</Button>

					<Button className="flex-1" variant="default">
						Đăng ký
					</Button>
				</Flex>
			</Flex>
		</div>
	);
}
