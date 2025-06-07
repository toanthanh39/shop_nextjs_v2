"use client";
import { useRouter } from "next/navigation";

import { CartLayout } from "@/features/cart/layout";

import { LoadingIcon } from "@/components/icons";
import { Button, Empty } from "@/components/ui";

import useCartGlobal from "@/lib/hooks/cache/useCartGlobal";


export default function Page() {
	const router = useRouter();
	const { cart, isLoading } = useCartGlobal({});
	console.log("🚀 ~ Page ~ cart:", cart);

	if (isLoading) {
		return <LoadingIcon />;
	}

	if (!cart || cart.details.data.length <= 0) {
		return (
			<Empty
				className="text-center justify-center items-center"
				size="lg"
				title={
					<Button onClick={() => router.push("/")} variant="primary">
						Quay lại mua hàng
					</Button>
				}
				dataSource={[]}></Empty>
		);
	}

	return <CartLayout cart={cart} />;
}
