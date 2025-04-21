import { Flex } from "@/components/ui";
import { ComProps } from "@/types/Component";
import { cn } from "@/utils/utils";

type Props = ComProps & {};
export default function CheckoutLayoutSection({ className, children }: Props) {
	return (
		<Flex
			direction="col"
			className={cn(
				"flex-1 h-full p-4 shadow-[0px_0px_6px_1px_rgba(0,0,0,0.2)]",
				className
			)}>
			{children}
		</Flex>
	);
}
