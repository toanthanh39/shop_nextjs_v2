import { motion, AnimatePresence } from "motion/react";

import { motionConfig } from "@/styles/motion-animate";
import { ComProps, ComDataSource } from "@/types/Component";

import { cn } from "@/utils/utils";

import { ConditionWrapper } from "../conditions";

import Empty from "./Empty";
import Flex from "./Flex";

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
							className={cn("w-full", classNameItem)}
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
		<ConditionWrapper condition={dataSource.length > 0}>
			<Flex as="ul" className={cn(className)}>
				<AnimatePresence mode="popLayout">
					{dataSource.map((item, index) => (
						<motion.li
							key={index}
							className={cn("w-full", classNameItem)}
							initial={motionConfig.fade.initial}
							animate={motionConfig.fade.animate}
							exit={motionConfig.fade.exit}
							transition={motionConfig.fade.transition}>
							{render(item, index)}
						</motion.li>
					))}
				</AnimatePresence>
			</Flex>
		</ConditionWrapper>
	);
}
