import { ComProps } from "./Component";
import { OrderItemJson, OrderJson, TYPE_SALE } from "./Order.type";

export type CartProps = {
	cart: OrderJson;
};

export type CartItemProps = Pick<
	ComProps,
	"className" | "disabled" | "isLoading"
> & {
	item: OrderItemJson;
};

export type CartCreate = {
	store_id: number;
	customer_token?: string;
	type_sale?: TYPE_SALE;
};
