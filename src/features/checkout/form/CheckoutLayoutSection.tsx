import { ComProps } from "@/types/Component";

import { Flex } from "@/components/ui";

import { cn } from "@/utils/utils";

type Props = ComProps & {};
export default function CheckoutLayoutSection({ className, children }: Props) {
	return (
		<Flex
			direction="col"
			className={cn(
				"flex-1 h-full p-4 rounded-md shadow-[0px_0px_6px_1px_rgba(0,0,0,0.2)]",
				className
			)}>
			{children}
		</Flex>
	);
}
