import { Button } from "@/components/ui";
import useCartGlobal from "@/lib/hooks/cache/useCartGlobal";
import { ProductJson } from "@/types/Product.type";
import { debounce } from "@/utils/utils";

type Props = {
	product: ProductJson;
	item_quantity: number;
};
export default function BuynowCart({ item_quantity, product }: Props) {
	const { buyNow, isBuyNow, isLoading } = useCartGlobal({});

	const onBuynow = debounce(async () => {
		try {
			const res = await buyNow({
				item_quantiy: item_quantity,
				product_json: product,
			});
		} catch (error) {
			console.log("🚀 ~ onBuynow ~ error:", error);
		}
	}, 200);
	return (
		<Button
			loading={isBuyNow || isLoading}
			onClick={onBuynow}
			variant="primary"
			className="flex-1 w-full max-w-40">
			Mua ngay
		</Button>
	);
}
