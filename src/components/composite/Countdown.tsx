"use client";
import React, { useState, useEffect } from "react";

import { ComProps } from "@/types/Component";

import { cn } from "@/utils/utils";

import { Text } from "../ui";

type CountdownProps = ComProps & {
	timestamp: number;
};

type TimeLeft = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

export default function Countdown({ timestamp, className }: CountdownProps) {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

	function calculateTimeLeft(): TimeLeft {
		const now = Math.floor(Date.now() / 1000); // Current time in seconds
		const difference = timestamp - now;

		if (difference <= 0) {
			return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}

		return {
			days: Math.floor(difference / (60 * 60 * 24)),
			hours: Math.floor((difference % (60 * 60 * 24)) / (60 * 60)),
			minutes: Math.floor((difference % (60 * 60)) / 60),
			seconds: Math.floor(difference % 60),
		};
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, [timestamp]);

	return (
		// <Flex gap={4} className="bg-colors-gray-5 text-white p-1 rounded-md">
		// 	<span className="p-1/2 w-8 text-center bg-white text-colors-gray-5 ">
		// 		{timeLeft.days}d
		// 	</span>
		// 	<span className="p-1/2 w-8 text-center bg-white text-colors-gray-5 ">
		// 		{timeLeft.hours}h
		// 	</span>
		// 	<span className="p-1/2 w-8 text-center bg-white text-colors-gray-5 ">
		// 		{timeLeft.minutes}m
		// 	</span>
		// 	<span className="p-1/2 w-8 text-center bg-white text-colors-gray-5 ">
		// 		{timeLeft.seconds}s
		// 	</span>
		// </Flex>

		<div className={cn("flex gap-1 font-mono", className)}>
			{[
				{ value: timeLeft.days, label: "Days" },
				{ value: timeLeft.hours, label: "Hours" },
				{ value: timeLeft.minutes, label: "Minutes" },
				{ value: timeLeft.seconds, label: "Seconds" },
			].map(({ value, label }, index) => (
				<div
					key={label}
					className="flex flex-col items-center bg-gray-800 rounded-md p-1 w-14">
					<span className="text-md font-bold text-white">
						{value.toString().padStart(2, "0")}
					</span>
					<Text as="span" size="sm" className=" text-gray-300">
						{label}
					</Text>
					{/* {index < 3 && <span className="text-lg text-white mx-1">:</span>} */}
				</div>
			))}
		</div>

		// <Flex
		// 	align="center"
		// 	className={cn("gap-1 font-mono text-white", className)}>
		// 	{[
		// 		{ value: timeLeft.days, label: "d" },
		// 		{ value: timeLeft.hours, label: "h" },
		// 		{ value: timeLeft.minutes, label: "m" },
		// 		{ value: timeLeft.seconds, label: "s" },
		// 	].map(({ value, label }, index) => (
		// 		<React.Fragment key={index}>
		// 			<Flex
		// 				gap={2}
		// 				align="center"
		// 				justify="between"
		// 				key={label}
		// 				className="bg-gray-800 rounded-sm px-1.5 py-1 w-10">
		// 				<Text as="span" variant="none" weight="semibold">
		// 					{value.toString().padStart(2, "0")}
		// 				</Text>
		// 				<span className="text-xs">{label}</span>
		// 			</Flex>
		// 			{index < 3 && (
		// 				<span className="text-base mx-0.5 text-colors-gray-5">:</span>
		// 			)}
		// 		</React.Fragment>
		// 	))}
		// </Flex>
	);
}
