"use client";

import Popup from "@/components/composite/Popup";
import { Flex, Grid } from "@/components/ui";
import { ProductQuickView } from "@/features/product/infor";
import { ProductCard } from "@/features/product/list";
import { ComDataSource } from "@/types/Component";
import { ComProps } from "@/types/Component";
import { ProductJson } from "@/types/Product.type";
import { useState } from "react";

type Props = ComDataSource<ProductJson> & {};

export default function PageClient({ dataSource }: Props) {
	const [productQuickView, setProductQuickView] = useState<ProductJson | null>(
		null
	);

	const onOpenQuickView = (p: ProductJson) => {
		setProductQuickView(p);
	};

	const onCloseQuickView = () => {
		setProductQuickView(undefined);
	};

	return (
		<Flex>
			<Flex className="basis-xs">filter</Flex>
			<Grid cols={4} gap={12}>
				{dataSource.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						onQuickView={onOpenQuickView}></ProductCard>
				))}
			</Grid>

			<Popup
				open={!!productQuickView}
				onOpenChange={onCloseQuickView}
				className="max-lg:hidden h-fit min-h-100  w-200">
				{productQuickView && (
					<ProductQuickView product={productQuickView}></ProductQuickView>
				)}
			</Popup>
		</Flex>
	);
}
