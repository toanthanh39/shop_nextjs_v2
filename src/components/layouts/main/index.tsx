import { ComProps } from "@/types/Component";
import { cn } from "@/utils/utils";

type MainProps = ComProps & {
	useContainer?: boolean;
	usePadding?: boolean;
};
export default function Main({
	children,
	className,
	useContainer = true,
	usePadding = false,
}: MainProps) {
	return (
		<main
			className={cn("min-h-[50dvh]", className, {
				container: !!useContainer,
				"px-3": !!usePadding,
			})}>
			{children && children}
		</main>
	);
}
