"use client";
import { LoadingIcon } from "@/components/icons";
import { Button, Empty } from "@/components/ui";
import { CartLayout } from "@/features/cart/layout";
import useCartGlobal from "@/lib/hooks/cache/useCartGlobal";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();
	const { cart, isLoading } = useCartGlobal({});

	if (isLoading) {
		return <LoadingIcon />;
	}

	if (!cart || cart.details.total <= 0) {
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
