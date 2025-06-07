"use client";

import { SHOW_WEB } from "@/types/Store.type";

import { StoreIcon } from "@/components/icons";
import Flex from "@/components/ui/Flex";
import Text from "@/components/ui/Text";

import useStores from "@/lib/hooks/cache/useStores";

export default function TotalStore() {
	const { data, isLoading } = useStores({
		filters: { show_web: SHOW_WEB.show },
	});
	return (
		<Flex
			align="center"
			wrap="no-wrap"
			gap={4}
			className="w-fit pr-4 border-r border-colors-gray-2">
			<StoreIcon />
			{data && (
				<>
					<Text as="span">{data.total}</Text>
				</>
			)}
			<Text as="span" className="whitespace-nowrap">
				Cửa hàng toàn quốc
			</Text>
		</Flex>
	);
}
