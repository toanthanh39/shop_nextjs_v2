import { Heading, Text } from "@/components/ui";
import { CartProps } from "@/types/Cart.type";
import { ComProps } from "@/types/Component";
import { cn } from "@/utils/utils";

type Props = ComProps & CartProps & {};

export default function CartHeading({ cart, className }: Props) {
	return (
		<div className={cn(className)}>
			<Heading
				level={1}
				size={"h2"}
				className="max-lg:mx-auto max-lg:text-base max-md:text-center"
				weight="bold">
				Giỏ hàng ({cart.details.total}) sản phẩm
			</Heading>
		</div>
	);
}
