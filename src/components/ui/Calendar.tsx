"use client";

import { ChevronLeft } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import "react-day-picker/style.css";
import { cn } from "@/utils/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			{...props}
			fromYear={1900}
			captionLayout="dropdown"
			defaultMonth={new Date()}
			components={{
				Chevron: ({ className, ...props }) => (
					<ChevronLeft className={cn("text-colors-red-5 h-4 w-4", className)} />
				),

				// ChevronRight: ({ className, ...props }) => (
				// 	<ChevronRight
				// 		className={cn("text-colors-red-5 h-4 w-4", className)}
				// 	/>
				// ),
			}}
			classNames={{
				chevron: "text-red-500",
			}}
		/>
	);
}
Calendar.displayName = "Calendar";

export { Calendar };
