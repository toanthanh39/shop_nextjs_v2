"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import ShopProvider from "./ShopProvider";
import { RootProviderProps } from "@/types/Shop.type";
import CartProvider from "./CartProvider";
import { SessionProvider } from "next-auth/react";
export default function RootProvider({ children }: RootProviderProps) {
	// const messages = useMessages();
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				staleTime: 0,
				retry: 2,
			},
		},
	});

	return (
		<React.Fragment>
			<SessionProvider>
				<QueryClientProvider client={queryClient}>
					<ShopProvider>
						<CartProvider>{children}</CartProvider>
					</ShopProvider>
				</QueryClientProvider>
			</SessionProvider>
		</React.Fragment>
	);
}
