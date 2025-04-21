"use client";
import Popup from "@/components/composite/Popup";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();
	return (
		<Popup
			open={true}
			onOpenChange={() => {
				router.back();
			}}>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, eius
			iste, inventore ad numquam corporis, nemo saepe magnam sed ea
			reprehenderit? Soluta enim tempora delectus, ut facere natus sunt maiores.
		</Popup>
	);
}
