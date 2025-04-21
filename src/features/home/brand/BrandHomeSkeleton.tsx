import Flex from "@/components/ui/Flex";
import Skeleton from "@/components/ui/Skeleton";

export default function BrandHomeSkeleton() {
	return (
		<div className="w-full">
			<Flex className="mb-[18px]" justify="between">
				<Skeleton className="w-20"></Skeleton>
				<Skeleton className="w-10"></Skeleton>
			</Flex>

			<Flex>
				{Array(2)
					.fill(0)
					.map((item, index) => {
						return <Skeleton className="w-1/2 min-h-[273px]" key={index} />;
					})}
			</Flex>
		</div>
	);
}
