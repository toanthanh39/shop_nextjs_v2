import { ComProps } from "@/types/Component";

import { cn } from "@/utils/utils";

import { SplashIcon } from "../icons";
import { Flex } from "../ui";

type Props = ComProps & {
	icon?: React.ReactNode;
};
export default function Loading({
	children,
	isLoading,
	className,
	icon = <SplashIcon></SplashIcon>,
}: Props) {
	if (isLoading)
		return (
			<Flex
				className={cn(className, "h-full w-full")}
				justify="center"
				align="center">
				{icon}
			</Flex>
		);
	return <>{children}</>;
}
