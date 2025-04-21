import React from "react";

interface Props {
	productName?: string;
	brand?: string;
}

export default function PerfumeIntructions({ productName, brand }: Props) {
	return (
		<div className="w-full mx-auto my-8 p-6 rounded-lg shadow-sm bg-white ">
			{/* Header Section */}
			<div className="border-b border-gray-200 pb-4 mb-6">
				<h1 className="text-2xl font-bold text-gray-800">Chi tiết sản phẩm</h1>
				<div className="flex space-x-6 mt-4 text-sm font-medium text-gray-600">
					<span className="cursor-pointer hover:text-gray-900">
						Sử dụng và bảo quản
					</span>
					<span className="cursor-pointer hover:text-gray-900">
						Vận chuyển và đổi trả
					</span>
				</div>
			</div>

			{/* Usage Instructions */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Cách sử dụng được {brand || "NamPerfume"} đề xuất dành cho bạn:
				</h2>

				<ul className="space-y-4 text-gray-700">
					<li className="flex items-start">
						<span className="inline-block bg-gray-200 rounded-full p-1 mr-3 mt-1">
							<svg
								className="w-3 h-3 text-gray-700"
								fill="currentColor"
								viewBox="0 0 20 20">
								<path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
							</svg>
						</span>
						Nước hoa mang lại mùi hương cho cơ thể bạn thông qua việc tiếp xúc
						lên da và phản ứng với hơi ấm trên cơ thể của bạn. Việc được tiếp
						xúc với các bộ phận như cổ tay, khuỷu tay, sau tai, gáy, cổ trước là
						những vị trí được ưu tiên hàng đầu trong việc sử dụng nước hoa bởi
						sự khuếch tán và thuận lợi trong việc tỏa mùi hương.
					</li>

					<li className="flex items-start">
						<span className="inline-block bg-gray-200 rounded-full p-1 mr-3 mt-1">
							<svg
								className="w-3 h-3 text-gray-700"
								fill="currentColor"
								viewBox="0 0 20 20">
								<path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
							</svg>
						</span>
						Sau khi sử dụng, vặn nắp nước hoa lại ngay, tránh để tay xát hoặc
						làm khô da bằng những vật dụng khác, điều này phá vỡ các tầng hương
						trong nước hoa, khiến nó có thể thay đổi mùi hương hoặc bay mùi
						nhanh hơn.
					</li>

					<li className="flex items-start">
						<span className="inline-block bg-gray-200 rounded-full p-1 mr-3 mt-1">
							<svg
								className="w-3 h-3 text-gray-700"
								fill="currentColor"
								viewBox="0 0 20 20">
								<path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
							</svg>
						</span>
						Để xịt nước hoa cách vị trí cần xịt khoảng 15-20cm và xịt mạnh, dứt
						khoát để mùi hương của nước hoa được tỏa rộng nhất, tăng độ bám trên
						da của bạn.
					</li>

					<li className="flex items-start">
						<span className="inline-block bg-gray-200 rounded-full p-1 mr-3 mt-1">
							<svg
								className="w-3 h-3 text-gray-700"
								fill="currentColor"
								viewBox="0 0 20 20">
								<path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
							</svg>
						</span>
						Phần cổ tay được xịt nước hoa thường có nhiều tác động như lúc rửa
						tay, đeo vòng, đóng mở hộp, do đó để đảm bảo mùi hương được duy trì,
						bạn nên sử dụng nước hoa ở cổ tay ở tần suất nhiều hơn lúc cần
						thiết.
					</li>

					<li className="flex items-start">
						<span className="inline-block bg-gray-200 rounded-full p-1 mr-3 mt-1">
							<svg
								className="w-3 h-3 text-gray-700"
								fill="currentColor"
								viewBox="0 0 20 20">
								<path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
							</svg>
						</span>
						Nước hoa có thể bám tốt hay không tốt phụ thuộc vào thời gian, không
						gian, cơ địa, chế độ sinh hoạt, ăn uống của bạn, việc sử dụng một
						loại nước hoa trong thời gian dài có thể khiến bạn bị quen mùi, dần
						đến hiện tượng không nhận biết được mùi hương. Mang theo nước hoa
						bên mình hoặc trang bị những mẫu mini tiện dụng để giúp bản thân
						luôn tự tin mọi lúc mọi nơi.
					</li>
				</ul>
			</section>

			{/* Storage Instructions */}
			<section>
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Bảo quản nước hoa:
				</h2>

				<div className="text-gray-700 space-y-4">
					<p>
						Nước hoa phổ thông (Designer) thường không có hạn sử dụng, ở một số
						Quốc gia, việc ghi chú hạn sử dụng là điều bắt buộc để hàng hóa được
						bán ra trên thị trường. Hạn sử dụng ở một số dòng nước hoa được chú
						thích từ 24 đến 36 tháng, và tính từ ngày bạn mở sản phẩm và sử dụng
						lần đầu tiên.
					</p>

					<p>
						Nước hoa là tổng hợp của nhiều thành phần hương liệu tự nhiên và
						tổng hợp, nên bảo quản nước hoa ở những nơi khô thoáng, mát mẻ,
						tránh nắng, nóng hoặc quá lạnh, lưu ý không để nước hoa trong cốp
						xe, những nơi có nhiệt độ nóng lạnh thất thường...
					</p>
				</div>
			</section>
		</div>
	);
}
