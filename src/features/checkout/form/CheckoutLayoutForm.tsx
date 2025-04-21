import { cn } from "@/utils/utils";
import { ComProps } from "@/types/Component";
import CheckoutForm from "./CheckoutForm";
import { Flex } from "@/components/ui";
import { OrderJson } from "@/types/Order.type";

type Props = ComProps & {
	order: OrderJson;
	sideBar?: React.ReactNode;
};
export default function CheckoutLayoutForm({
	className,
	children,
	order,
	sideBar,
}: Props) {
	return (
		<Flex className={cn(className)}>
			<Flex direction="col" gap={16} className="max-w-200">
				<CheckoutForm order={order}></CheckoutForm>
			</Flex>
			<Flex direction="col" gap={16} className="basis-100">
				{sideBar}
			</Flex>
		</Flex>
	);
}
