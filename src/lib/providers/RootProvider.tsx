"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { RootProviderProps } from "@/types/Shop.type";

import CartProvider from "./CartProvider";
import ShopProvider from "./ShopProvider";
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
			<QueryClientProvider client={queryClient}>
				<ShopProvider>
					<CartProvider>{children}</CartProvider>
				</ShopProvider>
			</QueryClientProvider>
		</React.Fragment>
	);
}
