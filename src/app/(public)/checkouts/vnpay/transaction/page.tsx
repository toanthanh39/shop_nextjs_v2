export const dynamic = "force-dynamic";
import { LoadingIcon } from "@/components/icons";
import PaymentRepo from "@/services/api/repositories/PaymentRepo";
import { SearchParams } from "@/types/Dynamic.type";

import { redirect } from "next/navigation";

export default async function Page({ searchParams }: SearchParams) {
	const { status, id } = await new PaymentRepo().checkTransactionVNpay(
		searchParams
	);

	if (status) {
		redirect("/checkouts/success/" + id);
	} else {
		redirect("/checkouts/failed/" + id);
	}

	return (
		<Suspense fallback={<LoadingIcon />}>
			<></>
		</Suspense>
	);
}
