import { AnimatePresence, motion } from "motion/react";

import { motionConfig } from "@/styles/motion-animate";
import { ComProps } from "@/types/Component";

import { cn } from "@/utils/utils";

type Props = ComProps & {
	show?: boolean;
};
export default function MotionItem({
	children,
	className,
	show = true,
}: Props) {
	return (
		<AnimatePresence mode="wait">
			{show && (
				<motion.div
					className={cn(className)}
					initial={motionConfig.fade.initial}
					animate={motionConfig.fade.animate}
					exit={motionConfig.fade.exit}
					transition={motionConfig.fade.transition}>
					{show && children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
