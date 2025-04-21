import { ComProps } from "@/types/Component";

import { cn } from "@/utils/utils";
import {
	HeaderCart,
	HeaderSearch,
	HeaderTop,
	Namperfume,
	Notification,
} from "./components";
import Flex from "@/components/ui/Flex";
import HeaderNavigation from "./components/HeaderNavigation";

type Props = ComProps & {};
export default function HeaderMobile({ className }: Props) {
	return (
		<div className={cn("block lg:hidden", className)}>
			<Flex align="end" justify="between" className="p-2">
				<Notification />
				<Namperfume className="translate-x-1/6" />

				<Flex className="w-fit">
					<HeaderSearch />
					<HeaderCart />
				</Flex>
			</Flex>
			<HeaderTop />
			<HeaderNavigation />
		</div>
	);
}
