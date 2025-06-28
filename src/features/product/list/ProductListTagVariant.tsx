"use client";

import React from "react";

import ProductModel from "@/services/models/ProductModel";
import { ComDataSource, ComProps } from "@/types/Component";
import { ProductJson } from "@/types/Product.type";

import { Flex, Grid, Tag, Text } from "@/components/ui";

import { ProductVariantTag } from "@/lib/hooks/cache/useProductVariantTag";
import { cn } from "@/utils/utils";

type Props = ComProps &
	ComDataSource<ProductVariantTag> & {
		variantActive: ProductJson;
		onSelect?: (variant: ProductJson) => void;
	};
export default function ProductListTagVariant(props: Props) {
	const { dataSource, variantActive, onSelect } = props;
	const productInstance = new ProductModel(variantActive);

	const onSelectVariant = (v: ProductJson) => {
		if (variantActive.id === v.id) return;
		onSelect?.(v);
	};

	return (
		<Flex direction="col" gap={16}>
			{/* Tiêu đề */}
			{dataSource.map((item, index) => {
				return (
					<Flex direction="col" gap={2} key={item.code}>
						<Text.p className="capitalize">{item.name}</Text.p>

						<Grid gap={8} cols={2} lg={3} xl={3} className="w-full gap-y-2">
							{item.items.map((option) => {
								const isSelected = variantActive.id === option.id;
								const outStock = option.quantity <= 0;
								const tagPromotions =
									ProductModel.getPromotionTagLabels(option);

								return (
									<button
										disabled={isSelected || outStock}
										key={option.id}
										onClick={() => onSelectVariant(option)}
										className={cn(
											`relative flex items-center px-3 py-1 h-10 whitespace-nowrap rounded-md border transition-colors`,
											{
												"border-2 border-colors-red-5": isSelected,
												"line-through opacity-80 cursor-not-allowed": outStock,
											}
										)}>
										<Text
											as="span"
											size="sm"
											className="whitespace-normal line-clamp-2 text-left leading-3">
											{option.option_name}
										</Text>

										{tagPromotions.map((tag, index) => {
											return (
												<Tag
													key={index}
													variant="primary"
													size="xs"
													className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 whitespace-nowrap line-clamp-1 rounded">
													{tag.name}
												</Tag>
											);
										})}
									</button>
								);
							})}
						</Grid>
					</Flex>
				);
			})}
		</Flex>
	);
}
