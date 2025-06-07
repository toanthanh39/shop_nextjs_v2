import { useQuery } from "@tanstack/react-query";

import ProductRepo from "@/services/api/repositories/ProductRepo";
import { HookCacheProps } from "@/types/Component";
import { IsShowPromotionPrice , ProductJson , ProductRelatedJson } from "@/types/Product.type";


import useSiteSetting from "./useSiteSetting";

const STALE_TIME = 60 * 1000;
const RETRY = 2;
export const CACHE_PRODUCT_VARIANTS_HOOK = "product-variants";

type Props = HookCacheProps & {
	product: ProductJson;
};

export type ProductVariantTag = Omit<ProductRelatedJson, "items"> & {
	items: ProductJson[];
};
function useProductVariantTag({ product, enabled }: Props) {
	const { data: site } = useSiteSetting();
	const { related } = product;

	const productIds = related
		.filter((r) => r.type === "PRODUCT STRUCT")
		.flatMap((i) => i.items);
	return useQuery({
		queryKey: [CACHE_PRODUCT_VARIANTS_HOOK, product.id, ...productIds],
		queryFn: async () => {
			try {
				const res = await new ProductRepo({
					accessMode: "PUBLIC",
				}).getAll({
					store_id: site?.store_id,
					show: "pos",
					show_promotion_price: IsShowPromotionPrice.show,
					list_product_id: productIds.join(","),
				});
				const results = related.reduce(
					(curr: ProductVariantTag[], prev: ProductRelatedJson) => {
						const dataItemProducts = res.items.filter((i) =>
							prev.items.includes(i.id)
						);
						if (dataItemProducts.length > 0) {
							curr.push({
								...prev,
								items: dataItemProducts,
							});
						}

						return curr;
					},
					[]
				);
				return results;
			} catch (error) {
				return [];
				// throw BaseApi.handleError(error);
			}
		},
		staleTime: STALE_TIME,
		enabled: enabled && !!site,
		retry: RETRY,
		// initialData: [],
	});
}

export default useProductVariantTag;
