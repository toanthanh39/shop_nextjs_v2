import { ComProps } from "@/types/Component";
import { StarIcon } from "../icons";
import { Flex, Text } from "../ui";
import { cn } from "@/utils/utils";
import { StarIconProps } from "../icons/StarIcon";

type Props = ComProps & {
	count?: number;
	rate?: number;
};
export default function Rating({ count, rate = 5, className }: Props) {
	const rateFormat = Math.max(Math.min(rate, 5), 0);
	const percent = (rateFormat / 5) * 100;

	const style: Partial<StarIconProps> = {
		variant: "default",
		size: "sm",
	};
	return (
		<Flex align="center" className={cn("w-fit", className)}>
			<div className={cn("relative block w-fit overflow-hidden h-4 leading-0")}>
				<span className="inline-block whitespace-nowrap ">
					<StarIcon.Outline {...style} />
					<StarIcon.Outline {...style} />
					<StarIcon.Outline {...style} />
					<StarIcon.Outline {...style} />
					<StarIcon.Outline {...style} />
				</span>

				<span
					style={{ width: `${percent}%` }}
					className={cn(
						"inline-block absolute top-0 left-0 whitespace-nowrap overflow-hidden "
					)}>
					<StarIcon {...style} />
					<StarIcon {...style} />
					<StarIcon {...style} />
					<StarIcon {...style} />
					<StarIcon {...style} />
				</span>
			</div>
			{count && (
				<Text as="span" className="ml-1" size="default">
					{count} Lượt đánh giá
				</Text>
			)}
		</Flex>
	);
}
