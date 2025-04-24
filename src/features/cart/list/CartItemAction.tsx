"use client";
import Popup from "@/components/composite/Popup";
import { CloseIcon } from "@/components/icons";
import { Button, Flex, Text } from "@/components/ui";
import { CartItemProps } from "@/types/Cart.type";
import { cn } from "@/utils/utils";
import { useState } from "react";

type Props = CartItemProps & {
	onDeleteItem: (id: number) => Promise<void>;
};
export default function CartItemAction({
	item,
	className,
	disabled,
	isLoading,
	onDeleteItem,
}: Props) {
	const [idDelete, setIdDelete] = useState(0);
	const [loading, setLoading] = useState(false);

	const onDelete = () => {
		setIdDelete(item.id);
	};

	const onCancel = () => {
		setIdDelete(0);
	};

	const onConfirmDelete = async () => {
		try {
			setLoading(true);
			await onDeleteItem(idDelete);
		} catch (error) {
		} finally {
			setIdDelete(0);
			setLoading(false);
		}
	};
	return (
		<>
			<Flex className={cn("w-fit", className)} justify="end">
				<Button
					disabled={isLoading}
					variant="text"
					onClick={onDelete}
					size="icon"
					icon={<CloseIcon></CloseIcon>}></Button>
			</Flex>
			<Popup
				title="Bạn chắc chắn muốn xóa!"
				hideCloseButton={true}
				open={idDelete > 0}
				onOpenChange={onCancel}>
				<div className="mt-4">
					<Text.p className="text-center">Xóa sản phẩm khỏi giỏ hàng</Text.p>
					<Flex gap={4} className="mt-4">
						<Button
							loading={loading}
							disabled={loading}
							onClick={onConfirmDelete}
							variant="default"
							className="w-full">
							Xác nhận
						</Button>
						<Button
							disabled={loading}
							onClick={onCancel}
							variant="secondary"
							className="w-full">
							Hủy
						</Button>
					</Flex>
				</div>
			</Popup>
		</>
	);
}
