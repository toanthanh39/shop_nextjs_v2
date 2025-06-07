// src/store/useStore.ts
import { create } from "zustand";

import { OrderJson } from "@/types/Order.type";
// Định nghĩa loại của state
interface CartState {
	items: { id: number; name: string; quantity: number }[];
	cart: OrderJson | null;
	addItem: (item: { id: number; name: string; quantity: number }) => void;
	removeItem: (id: number) => void;
	isLoading: boolean;
	setLoading: (loading: boolean) => void;
}

// Tạo store với Zustand
const useCartStore = create<CartState>((set) => ({
	items: [],
	cart: null,
	isLoading: false,
	setLoading: (loading: boolean) => set({ isLoading: loading }),
	addItem: (item) => set((state) => ({ items: [...state.items, item] })),
	removeItem: (id) =>
		set((state) => ({
			items: state.items.filter((item) => item.id !== id),
		})),
}));

export default useCartStore;
