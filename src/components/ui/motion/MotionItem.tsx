import { AnimatePresence, motion } from "motion/react";

import { getMotionConfig, MotionKey } from "@/styles/motion-animate";
import { ComProps } from "@/types/Component";

import { cn } from "@/utils/utils";

type Props = ComProps & {
	animate?: MotionKey;
	show?: boolean;
	as?: React.ElementType;
};
export default function MotionItem({
	children,
	className,
	animate = "slideUp",
	show = true,
	as = "div",
}: Props) {
	const config = getMotionConfig(animate);
	const MotionComponent = motion(as);
	return (
		<AnimatePresence mode="wait">
			{show && (
				<MotionComponent className={cn(className)} {...config}>
					{show && children}
				</MotionComponent>
			)}
		</AnimatePresence>
	);
}
