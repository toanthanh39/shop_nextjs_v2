import { Accordion } from "@/components/ui/preline";
import { BannerHome } from "../banner";
import { SectionHome } from "../section";
import SectionAbout from "../section/SectionAbout";
import { Dropdown, Popover } from "@/components/ui/preline/overlays";

export default function Body() {
	return (
		<>
			<Dropdown></Dropdown>

			<Accordion />

			<Popover></Popover>

			<BannerHome />
			<SectionHome />

			<SectionAbout />
		</>
	);
}
