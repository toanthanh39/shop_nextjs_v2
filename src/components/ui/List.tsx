import { ComProps } from "@/types/Component";
import { ComDataSource } from "@/types/Component";
import Flex from "./Flex";
import { cn } from "@/utils/utils";
import Empty from "./Empty";
import { motionConfig } from "@/styles/motion-animate";
import { motion, AnimatePresence } from "motion/react";

type Props<D> = ComProps &
	Required<ComDataSource<D>> & {
		classNameItem?: string;
		showEmpty?: boolean;
	};
export default function List<D>({
	dataSource,
	render,
	className,
	classNameItem,
	showEmpty = false,
}: Props<D>) {
	if (showEmpty) {
		return (
			<Empty dataSource={dataSource}>
				<Flex as="ul" wrap="wrap" gap={4} className={cn(className)}>
					{dataSource.map((item, index) => (
						<motion.li
							className={cn(classNameItem)}
							key={index}
							{...motionConfig.fade}>
							{render(item, index)}
						</motion.li>
					))}
				</Flex>
			</Empty>
		);
	}

	return (
		<Flex as="ul" className={cn(className)}>
			<AnimatePresence mode="sync">
				{dataSource.map((item, index) => (
					<motion.li
						key={index}
						className={cn(classNameItem)}
						initial={motionConfig.fade.initial}
						animate={motionConfig.fade.animate}
						exit={motionConfig.fade.exit}
						transition={motionConfig.fade.transition}>
						{render(item, index)}
					
					</motion.li>
				))}
			</AnimatePresence>
		</Flex>
	);
}
