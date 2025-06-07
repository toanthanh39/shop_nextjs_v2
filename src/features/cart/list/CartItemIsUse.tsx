"use client";

import { ChangeEvent, useEffect , useState } from "react";

import { CartItemProps } from "@/types/Cart.type";
import { IsUse } from "@/types/Global.type";

import { Checkbox } from "@/components/ui";

import { cn, debounce } from "@/utils/utils";



type Props = CartItemProps & {
	onChange?: (use: boolean) => Promise<void>;
};
export default function CartItemIsUse({
	item,
	className,
	disabled,
	onChange,
}: Props) {
	const [checked, setChecked] = useState(item.is_use === IsUse.USE);
	const onInputChange = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			const value = e.target.checked as boolean;
			await onChange?.(!value);
			setChecked(value);
		} catch (error) {}
	}, 200);

	useEffect(() => {
		if (Boolean(item.is_use === IsUse.USE) !== checked) {
			setChecked(item.is_use === IsUse.USE);
		}
	}, [checked, item.is_use]);
	return (
		<Checkbox
			onChange={onInputChange}
			checked={checked}
			disabled={disabled}
			className={cn(className)}
		/>
	);
}
