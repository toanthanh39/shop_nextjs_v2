import { Suspense } from "react";
import { BannerHome } from "../banner";
import { SectionHome } from "../section";
import SectionAbout from "../section/SectionAbout";
import Accordion from "@/components/ui/preline/Accordion";

export default function Body() {
	return (
		<>
			<Accordion></Accordion>
			{/* <BannerHome />
			<SectionHome />
			<Suspense>
				<SectionAbout />
			</Suspense> */}
		</>
	);
}
