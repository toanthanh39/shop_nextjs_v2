import { BannerHome } from "../banner";
import { SectionHome } from "../section";
import SectionAbout from "../section/SectionAbout";

export default function Body() {
	return (
		<>
			<BannerHome />
			<SectionHome />

			<SectionAbout />
		</>
	);
}
