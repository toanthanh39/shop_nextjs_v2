import { DateStatusResultJson } from "@/types/Component";
import { ComProps } from "@/types/Component";
import { Text } from "../ui";

type Props = ComProps & DateStatusResultJson;
export default function DateStatusResult({
	status,
	remainingDays,
	className,
}: Props) {
	const statusConfig = {
		waiting: {
			className: "bg-blue-100 text-blue-800 border border-blue-200",
			label: `Sắp diễn ra (${remainingDays} ngày)`,
		},
		running: {
			className: "bg-green-100 text-green-800 border border-green-200",
			label: `Đang diễn ra (còn ${remainingDays} ngày)`,
		},
		expired: {
			className: "bg-gray-100 text-gray-800 border border-gray-200",
			label: "Đã kết thúc",
		},
	};

	const config = statusConfig[status];

	return (
		<Text
			as="span"
			size="xxs"
			className={`inline-flex py-0.5 rounded-sm font-medium px-2 ${config.className}`}>
			{config.label}
		</Text>
	);
}
