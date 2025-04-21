"use client";
import { CartIcon } from "@/components/icons";
import { Badge, Button, LinkElement } from "@/components/ui";
import useCartGlobal, {
	CACHE_CART_GLOBAL_HOOK,
} from "@/lib/hooks/cache/useCartGlobal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function HeaderCart() {
	const { cart } = useCartGlobal({});

	return (
		<div className="relative">
			<Badge count={cart?.details?.total}>
				<LinkElement href="/cart" prefetch>
					<CartIcon />
				</LinkElement>
			</Badge>
		</div>
	);
}
