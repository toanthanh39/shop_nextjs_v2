import Flex from "@/components/ui/Flex";
import HeaderSearch from "./HeaderSearch";
import Namperfume from "./Namperfume";
import TotalStore from "@/features/store/infor/TotalStore";
import HeaderCart from "./HeaderCart";
import HeaderAuthen from "./HeaderAuthen";
import HeaderNmagazine from "./HeaderNmagazine";
import HeaderWishlist from "./HeaderWishlist";

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
