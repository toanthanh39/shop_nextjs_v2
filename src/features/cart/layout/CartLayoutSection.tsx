import { ComProps } from "@/types/Component";

import { cn } from "@/utils/utils";

type Props = ComProps & {};
export default function CartLayoutSection({ children, className }: Props) {
	return (
		<section
			className={cn(
				"w-full p-2 bg-white rounded-md	 shadow-[0px_0px_6px_1px_rgba(0,0,0,0.2)] overflow-hidden",
				className
			)}>
			{children}
		</section>
	);
}
