"use client";
import { useState, useTransition } from "react";

import { ProductPrice } from "@/features/product/infor";

import { CloseIcon, SearchIcon } from "@/components/icons";
import CustomImage from "@/components/ui/CustomImage";
import Flex from "@/components/ui/Flex";
import Input from "@/components/ui/Input";
import LinkElement from "@/components/ui/Link";

import useProductList from "@/lib/hooks/cache/useProductList";
import useSiteSetting from "@/lib/hooks/cache/useSiteSetting";
import Helper from "@/utils/helper";
import { cn } from "@/utils/utils";
import Validate from "@/utils/validate";

export default function HeaderSearch() {
	//state
	const [value, setValue] = useState("");

	///////////////////////////////////////
	//hooks
	const [isPending, startTransition] = useTransition();
	const { data: site } = useSiteSetting();
	const { data } = useProductList({
		filters: {
			keyword: value,
			limit: 5,
			store_id: site?.store_id,
			show: "web",
		},
		enabled: !!site?.store_id && value.length > 0 && !isPending,
	});

	///////////////////////////////////////
	//handle
	const onChange = (val: string) => {
		startTransition(() => setValue(Validate.validateInput(val)));
	};

	const handleReset = () => {
		setValue("");
	};

	return (
		<div className=" basis-[380px] relative">
			<Input
				className="max-lg:hidden px-3"
				value={value}
				addonBefore={<SearchIcon className="mr-2" />}
				addonAffter={
					value.length && <CloseIcon onClick={handleReset} size="sm" />
				}
				variant="border"
				placeholder="Tìm kiếm"
				onChange={(e) => {
					onChange(e.target.value);
				}}
			/>

			<SearchIcon className="mr-2 inline-block lg:hidden" />

			<Flex
				direction="col"
				gap={4}
				justify="center"
				className={cn(
					" absolute z-header  top-full left-0 p-2  h-fit max-h-[380px] rounded-b-sm bg-white overflow-y-auto shadow-lg",
					{
						hidden: !value.length || !data,
					}
				)}>
				{data && (
					<>
						{data.items.map((record, index) => {
							return (
								<Flex
									key={record.id}
									align="center"
									gap={8}
									className="py-2 hover:bg-colors-gray-2">
									<CustomImage
										className="flex-1 basis-10"
										width={40}
										height={40}
										src={record.images?.[0]?.url}
										alt={record.name}
									/>
									<Flex direction="col" gap={2} align="between">
										<LinkElement
											href={"/products/" + record.handle}
											size="sm"
											prefetch={true}>
											{record.name}
										</LinkElement>
										<ProductPrice product={record} />
									</Flex>
								</Flex>
							);
						})}
						<div className="sticky bottom-0 left-0 w-full text-center">
							<LinkElement
								href={
									"/search" + Helper.convertFilterToParams({ keyword: value })
								}
								className="block"
								variant="secondary">
								Xem thêm {data.total} sản phẩm
							</LinkElement>
						</div>
					</>
				)}
			</Flex>
		</div>
	);
}
