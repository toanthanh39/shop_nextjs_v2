"use client";

import GenericForm from "@/components/form/GenericForm";
import Radio from "@/components/form/Radio";
import { CustomImage, Heading, Money, Text } from "@/components/ui";
import Flex from "@/components/ui/Flex";
import Input, { RadioBox, Select } from "@/components/ui/Input";
import { DatePicker } from "@/components/ui/shacdn/DatePicker";
import { CartItemPrice } from "@/features/cart/list";
import useGenericFormMethods from "@/lib/hooks/form/useGenericFormMethods";
import { ComProps } from "@/types/Component";
import { OrderJson } from "@/types/Order.type";
import { cn, encodedQueryParams } from "@/utils/utils";
import { useState } from "react";
import { z } from "zod";
import CheckoutLayoutSection from "./CheckoutLayoutSection";
import { CartInfor } from "@/features/cart/infor";
import CartCoupon from "@/features/cart/promotion/CartCoupon";
import { useFormStatus } from "react-dom";
import { submitFormData } from "@/actions/cart-action";
import { useRouter } from "next/navigation";
import { AddressType } from "@/types/Customer.type";
import CartRepo from "@/services/api/repositories/CartRepo";
import { PaymentAccessMode, PaymentAddJsonPublic } from "@/types/Payment.type";
import useCartGlobal from "@/lib/hooks/cache/useCartGlobal";
import useSiteSetting from "@/lib/hooks/cache/useSiteSetting";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/shacdn/AlertDialog";
import BaseApi from "@/lib/axios/BaseApi";

type Props = ComProps & {
	order: OrderJson;
};

type CheckoutStatus = {
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	errors: string[];
};
export default function CheckoutForm({ className, order }: Props) {
	const { details } = order;
	////////////////////////////////////////

	const { pending } = useFormStatus();
	const router = useRouter();

	const { checkout, isCheckouting } = useCartGlobal({ enabled: false });
	const { data: siteSetting } = useSiteSetting();
	////////////////////////////////////////
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>({
		isError: false,
		isLoading: false,
		isSuccess: false,
		errors: [],
	});

	////////////////////////////////////////
	const validationSchema = z.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		phone: z.string().min(1, "Phone is required"),
		email: z.string().email("Invalid email").min(1, "Email is required"),
		city: z.string().min(1, "City is required"),
		district: z.string().min(1, "District is required"),
		ward: z.string().min(1, "Ward is required"),
		addressType: z.string().optional(),
		notes: z.string().optional(),
		date: z.number().optional(),
		address: z.string().min(1, "Address is required"),
		method: z.enum(["cod", "transfer", "vnpay"], {
			errorMap: (e) => ({ message: "Invalid payment method selected" }),
		}),
	});

	type FormData = z.infer<typeof validationSchema>;

	const defaultValues: FormData = {
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		city: "",
		district: "",
		ward: "",
		addressType: AddressType.HOME.toString(),
		notes: "",
		method: "cod",
		address: "",
		date: undefined,
	};

	const methods = useGenericFormMethods({
		defaultValues: defaultValues,
		validationSchema: validationSchema,
		mode: "onChange",
	});
	const method = methods.watch("method");

	const onCheckout = async (data: FormData) => {
		console.log("Form submitted", data);

		try {
			const dataPayment: PaymentAddJsonPublic = {
				cart_id: order.id,
				billing_country: 241,
				billing_firstname: data.firstName,
				billing_lastname: data.lastName,
				billing_address: data.address,
				billing_province: +data.city,
				billing_district: +data.district,
				billing_ward: +data.ward,
				billing_fullname: data.firstName + " " + data.lastName,
				billing_phone: data.phone,
				billing_email: data.email,

				shipping_country: 241,
				shipping_firstname: data.firstName,
				shipping_lastname: data.lastName,
				shipping_address: data.address,
				shipping_province: +data.city,
				shipping_district: +data.district,
				shipping_ward: +data.ward,
				shipping_fullname: data.firstName + " " + data.lastName,
				shipping_phone: data.phone,
				shipping_email: data.email,

				note: data.notes,
				payment_method: data.method,

				store_id: order.store_id,
				customer_token: order.customer_token,

				customer_id: 0,
				sale_channel: siteSetting?.id_ecomplatforms_for_web ?? "",
			};
			const res = await checkout({
				access_mode: PaymentAccessMode.PUBLIC,
				data: dataPayment,
			});

			// Bắt đầu prefetch trang thành công
			setCheckoutStatus((prev) => ({ ...prev, isLoading: true }));
			await router.prefetch(`/checkouts/success/${order.id}`);

			router.push(
				encodedQueryParams({
					path: `/checkouts/success/${res.id}`,
					query: { name: "123@322  1F1```%^&" },
				})
			);

			// Chuyển hướng sau khi prefetch hoàn thành
		} catch (error) {
			const dataError = BaseApi.handleError(error);
			setCheckoutStatus((prev) => ({
				...prev,
				isError: true,
				errors: dataError.errors,
			}));
		} finally {
			setCheckoutStatus((prev) => ({ ...prev, isLoading: false }));
		}
	};

	////////////////////////////////////////
	const classRadio = "py-3 w-full max-w-full bg-colors-gray-2";

	return (
		<Flex gap={16} className={cn("mt-16 ", className)}>
			<GenericForm
				onSubmit={methods.handleSubmit(onCheckout)}
				methods={methods}>
				<Flex direction="col" gap={16} className="max-w-200">
					<Heading level={2} size={"h3"}>
						Thông tin người nhận
					</Heading>
					<Flex gap={8}>
						<GenericForm.Item required name="firstName" label="Họ">
							<Input variant="line" placeholder="Nhập họ" />
						</GenericForm.Item>
						<GenericForm.Item required name="lastName" label="Tên">
							<Input variant="line" placeholder="Nhập tên" />
						</GenericForm.Item>
					</Flex>
					<Flex gap={8}>
						<GenericForm.Item required name="phone" label="Số điện thoại">
							<Input variant="line" placeholder="Nhập số điện thoại" />
						</GenericForm.Item>

						<GenericForm.Item required name="email" label="Email">
							<Input variant="line" />
						</GenericForm.Item>
					</Flex>

					<GenericForm.Item required name="address" label="Địa chỉ">
						<Input
							variant="line"
							placeholder="Nhập địa chỉ"
							className="max-w-full"
							onChange={(e) => {
								// methods.setValue("address", e.target.value);
							}}
						/>
					</GenericForm.Item>
					<Flex gap={8}>
						<GenericForm.Item required name="city" label="Tỉnh/Thành phố">
							<Select
								variant="line"
								placeholder="Chọn tỉnh/thành phố"
								options={[
									{ value: 9870, label: "Hồ Chí Minh" },
									{ value: 7323, label: "Đà Nẵng" },
								]}
							/>
						</GenericForm.Item>
						<GenericForm.Item required name="district" label="Quận/Huyện">
							<Select
								variant="line"
								placeholder="Chọn quận/huyện"
								options={[
									{ value: 9870, label: "Quận Bình Chánh" },
									{ value: 9894, label: "Quận Gò Vấp" },
								]}
							/>
						</GenericForm.Item>
						<GenericForm.Item required name="ward" label="Phường/Xã">
							<Select
								variant="line"
								placeholder="Chọn phường/xã"
								options={[{ value: 9904, label: "Phường 7" }]}
							/>
						</GenericForm.Item>
					</Flex>
					<Flex gap={4}>
						<GenericForm.Item name="addressType">
							<Radio
								options={[
									{
										id: AddressType.HOME,
										label: "Nhà",
										value: AddressType.HOME,
									},
									{
										id: AddressType.WORK,
										label: "Công ty",
										value: AddressType.WORK,
									},
									{
										id: AddressType.OTHER,
										label: "Khác",
										value: AddressType.OTHER,
									},
								]}
							/>
						</GenericForm.Item>
					</Flex>
					<GenericForm.Item name="notes" label="Ghi chú">
						<Input
							variant="line"
							placeholder="Nhập ghi chú"
							className="max-w-full"
						/>
					</GenericForm.Item>

					<GenericForm.Item label="Phương thức thanh toán" name="method">
						<Radio
							className="flex flex-col gap-2"
							name="method"
							options={[
								{
									id: "cod",
									label: (
										<>
											<Text as="span" weight="bold">
												COD
											</Text>{" "}
											(Thanh toán khi nhận hàng)
										</>
									),
									value: "cod",
									className: classRadio,
								},
								{
									id: "transfer",
									label: (
										<>
											<Text as="span" weight="bold">
												Chuyển khoản
											</Text>{" "}
											(Thanh toán chuyển khoản)
										</>
									),
									value: "transfer",
									className: classRadio,
								},
								{
									id: "vnpay",
									label: (
										<>
											<Text as="span" weight="bold">
												VNPay
											</Text>{" "}
											(Thanh toán qua app VNPay)
										</>
									),
									value: "vnpay",
									className: classRadio,
								},
							]}
						/>
					</GenericForm.Item>
					<GenericForm.Item name="date">
						<DatePicker
							date={date}
							setDate={(date) => {
								if (!date) return;
								methods.setValue("date", date.getTime() / 1000);
								setDate(date);
							}}></DatePicker>
					</GenericForm.Item>
					<Flex direction="col" gap={16} className="mb-16">
						<Text>
							Giá trên chưa bao gồm các khoản thuế nhập khẩu và phải thanh toán
							khi nhận hàng.
						</Text>
						<Text>
							{" "}
							Khi hoàn tất quá trình đặt hàng, tôi tuyên bố rằng tôi đã đọc và
							hiểu các Điều Khoản & Điều Kiện Chung, Chính sách đổi trả và Chính
							sách bảo mật như đã quy định trên trang web{" "}
							<strong>NAMPERFUME.NET</strong>
						</Text>
					</Flex>
				</Flex>
				{/* <GenericForm.Submit loading={pending}>Thanh toán</GenericForm.Submit> */}
			</GenericForm>

			<Flex direction="col" gap={16} className="basis-100">
				<CheckoutLayoutSection>
					<Heading level={3} size="h4">
						Đơn hàng
					</Heading>
					<ul className="list-none w-full">
						{details.data.map((item) => (
							<Flex
								as="li"
								key={item.id}
								align="center"
								gap={4}
								className="py-2 border-b">
								<CustomImage
									src={item.product_json.images?.[0]?.url ?? ""}
									alt={item.product_json.name}
									width={60}
									height={60}></CustomImage>
								<div className="w-full">
									<Text.p weight="semibold">{item.product_json.name}</Text.p>
									<Text.p size="sm" className=" text-gray-500">
										{item.product_json.option_name}
									</Text.p>
									{/* <Money value={item.price_final} variant="primary"></Money> */}
									<CartItemPrice
										item={item}
										className="flex-row justify-between w-full"></CartItemPrice>
								</div>
							</Flex>
						))}
					</ul>
				</CheckoutLayoutSection>
				<CheckoutLayoutSection>
					<CartCoupon className="w-full" cart={order}></CartCoupon>
				</CheckoutLayoutSection>
				<CheckoutLayoutSection>
					<CartInfor
						isLoading={isCheckouting || checkoutStatus.isLoading}
						cart={order}
						onSubmit={methods.handleSubmit(onCheckout)}></CartInfor>
				</CheckoutLayoutSection>
			</Flex>

			<AlertDialog
				open={checkoutStatus.isError}
				onOpenChange={() =>
					setCheckoutStatus((prev) => ({ ...prev, isError: false }))
				}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Thanh toán thất bại</AlertDialogTitle>
						<AlertDialogDescription>
							{checkoutStatus.errors.map((error) => (
								<Text as="span" key={error}>
									{error}
								</Text>
							))}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Flex>
	);
}
