import { ComProps } from "@/types/Component";
import { Anouncement, HeaderMid, HeaderTop } from "./components";
import { cn } from "@/utils/utils";

type Props = ComProps & {};
export default function HeaderDesktop({ className }: Props) {
	return (
		<div className={cn("hidden lg:block", className)}>
			<Anouncement />
			<HeaderTop />
			<HeaderMid />
		</div>
	);
}
