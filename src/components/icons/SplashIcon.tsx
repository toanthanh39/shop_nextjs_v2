import React from "react";
import LogoIcon from "./LogoIcon";
import { sizes, variants } from "@/styles/svg-variant";
import { cn, initArray } from "@/utils/utils";
import { Flex } from "../ui";
import { VariantProps } from "class-variance-authority";
import { ComProps } from "@/types/Component";

interface SplashIconProps
	extends VariantProps<typeof variants>,
		VariantProps<typeof sizes>,
		ComProps {}
export default function SplashIcon(props: SplashIconProps) {
	const { size, variant } = props;
	return (
		<Flex vertical align="center" className=" relative w-fit " gap={16}>
			<div className="splash-icon rounded overflow-hidden grid grid-cols-3 grid-rows-3 z-11 w-[108px] h-[108px]">
				{Array.from({ length: 9 }).map((item, index) => {
					let group;
					if (index < 3) {
						group = index + 1;
					} else if (index < 6) {
						group = index - 1;
					} else {
						group = index - 3;
					}

					return (
						<span
							style={{ "--i": group } as React.CSSProperties}
							className={`your-custom-bg bg-position-${index}`}
							key={index}></span>
					);
				})}
			</div>
			<div className="text-loading flex gap-1 h-8 overflow-hidden ">
				{"Loading".split("").map((item, index) => {
					return (
						<span
							key={index}
							style={{ "--i": index + 1 } as React.CSSProperties}>
							{item}
						</span>
					);
				})}
			</div>
		</Flex>
	);
}
