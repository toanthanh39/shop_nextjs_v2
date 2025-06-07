import TotalStore from "@/features/store/infor/TotalStore";

import Flex from "@/components/ui/Flex";

import HeaderAuthen from "./HeaderAuthen";
import HeaderCart from "./HeaderCart";
import HeaderNmagazine from "./HeaderNmagazine";
import HeaderSearch from "./HeaderSearch";
import HeaderWishlist from "./HeaderWishlist";
import Namperfume from "./Namperfume";

export default function HeaderMid() {
	return (
		<section id="headerMid" className="transition-all ease-in duration-300">
			<Flex className="container py-2 " align="center" wrap="no-wrap" gap={32}>
				<Namperfume />
				<HeaderSearch />
				<TotalStore />
				<HeaderNmagazine />
				<HeaderAuthen />
				<Flex className="w-fit basis-auto grow-1" justify="end" gap={16}>
					<HeaderWishlist />
					<HeaderCart />
				</Flex>
			</Flex>
		</section>
	);
}
