// components/ui/date-picker.tsx
import { format } from "date-fns";
import { vi } from "date-fns/locale"; // Nếu muốn dùng tiếng Việt
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import Button from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/shacdn/Popover";

import { cn } from "@/utils/utils";

interface DatePickerProps {
	date?: Date;
	setDate?: (date: Date | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
}

export function DatePicker({
	date,
	setDate,
	placeholder = "Chọn ngày",
	disabled = false,
}: DatePickerProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="default"
					className={cn(
						"w-auto justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
					disabled={disabled}>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? (
						format(date, "dd/MM/yyyy", { locale: vi })
					) : (
						<span>{placeholder}</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-2 bg-white" align="start">
				<Calendar
					mode="single"
					selected={date}
					onSelect={(newDate) => {
						setDate?.(newDate);
						setOpen(false);
					}}
					initialFocus
					locale={vi} // Thêm locale nếu muốn dùng tiếng Việt
				/>
			</PopoverContent>
		</Popover>
	);
}
