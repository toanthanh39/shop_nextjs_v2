import { ComProps } from "@/types/Component";

import { cn } from "@/utils/utils";

import { Anouncement, HeaderMid, HeaderTop } from "./components";

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
