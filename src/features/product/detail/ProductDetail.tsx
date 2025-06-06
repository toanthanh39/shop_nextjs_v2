"use client";
import Image from "next/image";
import React, { useState } from "react";

import { ProductJson } from "@/types/Product.type";

import { CustomImage, Flex, Money } from "@/components/ui";


import useCartGlobal from "@/lib/hooks/cache/useCartGlobal";

type Props = {
	product: ProductJson;
};
export default function ProductDetail({ product }: Props) {
	const { addToCart } = useCartGlobal({});
	/////////////////////////////////////////////////////

	const [quantity, setQuantity] = useState(1);
	const [selectedSize, setSelectedSize] = useState("Eau de Parfum 100ml");

	const hasDiscount = true;
	const discountPercentage = hasDiscount ? 10 : 0;
	const sizes = ["Eau de Parfum 100ml", "Tester"];

	/////////////////////////////////////////////////////

	const add = async () => {
		try {
			await addToCart({
				item_quantity: 1,
				product_id: product.id,
				product_json: product,
			});
		} catch (error) {}
	};

	return (
		<div className="container mx-auto my-8 flex flex-col md:flex-row gap-8">
			{/* Product Images Section */}
			<div className="">
				<div className="relative w-90 h-90">
					<CustomImage
						src={product.images?.[0]?.url ?? ""}
						alt="Salvatore Ferragamo Red Leather"
						layout="fill"
						objectFit="contain"
					/>
				</div>
				<div className="flex gap-2 mt-4 overflow-x-auto">
					{product.images.map((_, index) => (
						<div
							key={index}
							className="w-20 h-20 relative border border-gray-300">
							<Image
								src={_.url}
								alt={`Thumbnail ${index + 1}`}
								layout="fill"
								objectFit="contain"
							/>
						</div>
					))}
				</div>
			</div>

			{/* Product Details Section */}
			<div className="flex-1 max-w-xl">
				<h1 className="text-2xl font-bold text-gray-800">
					Salvatore Ferragamo Red Leather For Men
				</h1>
				<div className="flex items-center mt-2">
					<div className="text-yellow-400">★★★★★</div>
					<span className="ml-2 text-gray-600">(0 lượt đánh giá)</span>
					<span className="ml-4 text-blue-500">Nam</span>
				</div>
				<p className="text-gray-600 mt-1">
					<span className="font-semibold">Thương hiệu:</span> Salvatore
					Ferragamo
				</p>
				<p className="text-gray-600 mt-1">
					<span className="font-semibold">Eau de Parfum 100ml</span>
					<span className="ml-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
						NEW
					</span>
				</p>
				{/* Price Section */}
				<div className="mt-4">
					<span className="text-xl font-bold text-gray-800">
						<Money variant="primary" size="lg" value={product.price}></Money>
					</span>
					<span className="ml-2 text-lg text-gray-400 line-through">
						<Money
							size="lg"
							variant="secondary"
							value={product.compare_at_price}></Money>
					</span>
					<span className="ml-2 text-red-500 font-semibold">
						(Tiết kiệm: {Math.round(product.compare_discount_percent)}%)
					</span>
				</div>
				{/* Price and Promotion Section */}
				{/* <div className="mt-4 flex items-center">
					{hasDiscount ? (
						<>
							<span className="text-xl font-bold text-red-500">
								{1200000!.toLocaleString()}đ
							</span>
							<span className="ml-2 text-lg text-gray-400 line-through">
								{product.price.toLocaleString()}đ
							</span>
							<span className="ml-2 text-red-500 font-semibold">
								(Tiết kiệm: {discountPercentage}%)
							</span>
							<span className="ml-4 bg-red-500 text-white px-2 py-1 text-xs rounded">
								SALE
							</span>
						</>
					) : (
						<span className="text-2xl font-bold text-gray-800">
							{product.price.toLocaleString()}đ
						</span>
					)}
				</div> */}

				{/* Promotions */}
				<div className="mt-4 w-fit ">
					<div className="p-2 rounded bg-red-100">
						<span className="font-bold text-colors-red-5">
							Deal thơm{" "}
							<span className="text-2xl ">{1200000!.toLocaleString()}đ</span>
						</span>

						<p>
							<span>
								Nhập code <strong className="text-blue-900">DEALTHOM10</strong>
							</span>{" "}
							<span>
								Giảm thêm <strong>10%</strong>
							</span>
						</p>
					</div>
				</div>
				{/* Size Selection */}
				<div className="mt-4">
					<p className="text-gray-600 font-semibold">Standard Size</p>
					<div className="flex gap-2 mt-2">
						{sizes.map((size) => (
							<button
								key={size}
								onClick={() => setSelectedSize(size)}
								className={`px-4 py-2 border rounded ${
									selectedSize === size
										? "border-red-500 text-red-500"
										: "border-gray-300 text-gray-600"
								}`}>
								{size}
							</button>
						))}
					</div>
				</div>
				{/* Quantity Selector */}
				<div className="mt-4 flex items-center">
					<p className="text-gray-600 font-semibold mr-4">Số lượng:</p>
					<div className="flex items-center border border-gray-300 rounded">
						<button
							onClick={() => setQuantity(Math.max(1, quantity - 1))}
							className="px-3 py-1 text-gray-600">
							-
						</button>
						<span className="px-4 py-1">{quantity}</span>
						<button
							onClick={() => setQuantity(quantity + 1)}
							className="px-3 py-1 text-gray-600">
							+
						</button>
					</div>
				</div>
				{/* Action Buttons */}
				<div className="mt-6 flex gap-4">
					<button className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600">
						MUA NGAY
					</button>
					<button
						onClick={add}
						className="border border-red-500 text-red-500 px-6 py-3 rounded hover:bg-red-50">
						THÊM VÀO GIỎ HÀNG
					</button>
					<button className="border border-gray-300 text-gray-600 px-4 py-3 rounded hover:bg-gray-100">
						Yêu thích ❤️
					</button>
				</div>
				{/* Additional Info */}
				<Flex gap={32} className="mt-6 text-gray-600">
					<p>🚚 Freeship toàn quốc</p>
					<p>✅ Chính hãng 100%</p>
					<p>↩ Đổi trả miễn phí</p>
				</Flex>
				{/* Contact Info */}
				<div className="mt-4 text-gray-600">
					<p className="font-semibold">
						GỌI ĐẶT MUA:{" "}
						<a href="tel:19000129" className="text-red-500">
							1900 0129
						</a>{" "}
						(9:00-21:00)
					</p>
				</div>
			</div>
		</div>
	);
}
