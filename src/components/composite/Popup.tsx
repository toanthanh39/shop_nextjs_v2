import { cn } from "@/utils/utils";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "../ui/shacdn/Dialog";

type Props = {
	open: boolean;
	onOpenChange?: (open: boolean) => void;
	animate?: "fade" | undefined;
	title?: string | React.ReactNode;
	children?: React.ReactNode;
	hideCloseButton?: boolean;
	className?: string;
};
export default function Popup({
	open,
	onOpenChange,
	animate,
	title,
	children,
	hideCloseButton = false,
	className,
}: Props) {
	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent
					hideCloseButton={hideCloseButton}
					aria-describedby="hidden-dialog-description"
					onInteractOutside={(e: any) => {
						e.preventDefault();
						// if (document.querySelector(".popover-class-open")) {
						// 	e.preventDefault();
						// 	return;
						// }
						// if (closeOnMark) {
						// 	return;
						// }
					}}
					className={cn(
						"w-fit min-w-[330px] sm:max-w-[425px] lg:max-w-250 max-h-screen overflow-hidden rounded-[8px]  border-none",

						{
							"data-[state=open]: animate-modal-down data-[state=closed]:animate-modal-up":
								true,
						},
						className
					)}>
					<DialogHeader>
						<DialogTitle
							className={cn("mb-4 text-center", {
								"sr-only": !title,
							})}>
							{title}
						</DialogTitle>
					</DialogHeader>

					{children && children}
				</DialogContent>
				{/* <DialogDescription></DialogDescription> */}
			</Dialog>
		</>
	);
}
