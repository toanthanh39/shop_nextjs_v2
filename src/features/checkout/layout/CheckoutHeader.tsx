import { LogoIcon } from "@/components/icons";
import Flex from "@/components/ui/Flex";
import LinkElement from "@/components/ui/Link";

export default function CheckoutHeader() {
	return (
		<Flex className="border-b border-gray-200 py-2" justify="center">
			<LinkElement href="/" prefetch={true}>
				<LogoIcon />
			</LinkElement>
		</Flex>
	);
}
