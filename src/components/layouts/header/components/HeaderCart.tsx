"use client";
import { CartIcon } from "@/components/icons";
import { Badge, LinkElement } from "@/components/ui";
import useCartGlobal from "@/lib/hooks/cache/useCartGlobal";

export default function HeaderCart() {
	const { cart } = useCartGlobal({});

	return (
		<div className="relative">
			<Badge count={cart?.details?.total}>
				<LinkElement href="/cart">
					<CartIcon />
				</LinkElement>
			</Badge>
		</div>
	);
}
