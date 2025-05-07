import { ComProps } from "@/types/Component";
import { Flex } from "../ui";
import { SplashIcon } from "../icons";
import { cn } from "@/utils/utils";

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
