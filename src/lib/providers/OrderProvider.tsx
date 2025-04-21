import { RootProviderProps } from "@/types/Shop.type";
import React from "react";
import useCartGlobal from "../hooks/cache/useCartGlobal";

type Props = RootProviderProps & {};
export default function OrderProvider({ children }: Props) {
	return <>{children}</>;
}
