"use client";

import { useEffect, useState } from "react";

type Props = {
	isLoading: boolean;
};
export default function ProgressBar({ isLoading }: Props) {
	const [width, setWidth] = useState<number>(0);

	useEffect(() => {
		if (!isLoading) {
			setWidth(100);
			const timeout = setTimeout(() => setWidth(0), 300);
			return () => clearTimeout(timeout);
		}

		let interval: NodeJS.Timeout;
		if (isLoading) {
			setWidth(0);
			interval = setInterval(() => {
				setWidth((prev) => {
					if (prev >= 80) {
						return prev; // Dừng ở 80% để tạo hiệu ứng "gần hoàn thành"
					}
					return prev + Math.random() * 10; // Tăng ngẫu nhiên
				});
			}, 200);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isLoading]);

	if (width === 0 && !isLoading) return null;
	return (
		<div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[9999]">
			<div
				className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
				style={{ width: `${width}%` }}
			/>
		</div>
	);
}
