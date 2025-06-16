import { BannerHome } from "../banner";
import { SectionHome } from "../section";
import SectionAbout from "../section/SectionAbout";
import { Dropdown, Popover } from "@/components/ui/preline/overlays";
import { Range } from "@/components/form";

export default function Body() {
	return (
		<>
			<Range min={0} max={2000000}></Range>
			<BannerHome />
			<SectionHome />

			<SectionAbout />
		</>
	);
}
