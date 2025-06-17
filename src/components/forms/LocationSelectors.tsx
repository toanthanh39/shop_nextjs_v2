// components/LocationSelectors.tsx
"use client";

import { useLocationOptions } from "@/lib/hooks/cache/useLocationOptions";
import React, { useState } from "react";
import { Select } from "../ui/Input";
import GenericForm from "./GenericForm";

// Giả định bạn có một component Selectbox tùy chỉnh
interface CustomSelectProps {
	name: string;
	label: string;
	options: { value: number; label: string }[];
	value: number | null;
	onChange: (value: number | null) => void;
	placeholder?: string;
	disabled?: boolean;
	isLoading?: boolean;
}

type Props = {
	onChangeProvince?: (val: number | null) => void;
	onChangeDistrict?: (val: number | null) => void;
	onChangeWard?: (val: number | null) => void;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
	name,
	label,
	options,
	value,
	onChange,
	placeholder,
	disabled,
	isLoading,
}) => (
	<GenericForm.Item name={name} label={label}>
		<Select
			variant="line"
			placeholder={placeholder}
			// value={value ?? ""}
			onChange={(e) => {
				onChange(e.target.value ? Number(e.target.value) : null);
			}}
			disabled={disabled || isLoading}
			options={[...options]}
		/>
	</GenericForm.Item>
);

export default function LocationSelectors(props: Props) {
	const { onChangeDistrict, onChangeProvince, onChangeWard } = props;

	const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
		null
	);

	const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(
		null
	);
	const [selectedWardId, setSelectedWardId] = useState<number | null>(null);

	// 1. Hook cho Tỉnh/Thành phố (parent_id = null)
	const {
		options: provinceOptions,
		isLoading: isLoadingProvinces,
		error: provinceError,
	} = useLocationOptions({ parentId: null, isCountryLevel: true }); // parentId là null để lấy các tỉnh/thành phố

	// 2. Hook cho Quận/Huyện (parent_id = selectedProvinceId)
	const {
		options: districtOptions,
		isLoading: isLoadingDistricts,
		error: districtError,
	} = useLocationOptions({
		parentId: selectedProvinceId,
		// Chỉ bật query nếu có selectedProvinceId và hook chính đang enabled
		enabled: !!selectedProvinceId,
	});

	// 3. Hook cho Xã/Phường (parent_id = selectedDistrictId)
	const {
		options: wardOptions,
		isLoading: isLoadingWards,
		error: wardError,
	} = useLocationOptions({
		parentId: selectedDistrictId,
		// Chỉ bật query nếu có selectedDistrictId và hook chính đang enabled
		enabled: !!selectedDistrictId,
	});

	// Xử lý thay đổi Tỉnh/Thành phố
	const handleProvinceChange = (id: number | null) => {
		setSelectedProvinceId(id);
		setSelectedDistrictId(null); // Reset Quận/Huyện khi Tỉnh/Thành phố thay đổi
		setSelectedWardId(null); // Reset Xã/Phường khi Tỉnh/Thành phố thay đổi
		onChangeProvince?.(id);
	};

	// Xử lý thay đổi Quận/Huyện
	const handleDistrictChange = (id: number | null) => {
		setSelectedDistrictId(id);
		setSelectedWardId(null); // Reset Xã/Phường khi Quận/Huyện thay đổi
		onChangeDistrict?.(id);
	};

	// Xử lý thay đổi Xã/Phường
	const handleWardChange = (id: number | null) => {
		setSelectedWardId(id);
		onChangeWard?.(id);
	};

	if (provinceError || districtError || wardError) {
		return <div style={{ color: "red" }}>Error loading locations!</div>;
	}

	return (
		<>
			<CustomSelect
				name="city"
				options={provinceOptions || []}
				value={selectedProvinceId}
				onChange={handleProvinceChange}
				label="Tỉnh/Thành phố"
				placeholder="Chọn Tỉnh/Thành phố"
				isLoading={isLoadingProvinces}
			/>
			<CustomSelect
				name="district"
				options={districtOptions || []}
				label="Quận/Huyện"
				value={selectedDistrictId}
				onChange={handleDistrictChange}
				placeholder="Chọn Quận/Huyện"
				isLoading={isLoadingDistricts}
				disabled={!selectedProvinceId} // Disable nếu chưa chọn Tỉnh/Thành phố
			/>
			<CustomSelect
				name="ward"
				options={wardOptions || []}
				label="Phường/Xã"
				value={selectedWardId}
				onChange={handleWardChange}
				placeholder="Chọn Xã/Phường"
				isLoading={isLoadingWards}
				disabled={!selectedDistrictId} // Disable nếu chưa chọn Quận/Huyện
			/>

			{/* <div style={{ marginTop: '20px' }}>
        <h3>Thông tin đã chọn:</h3>
        <p>Tỉnh/Thành phố ID: {selectedProvinceId ?? 'Chưa chọn'}</p>
        <p>Quận/Huyện ID: {selectedDistrictId ?? 'Chưa chọn'}</p>
        <p>Xã/Phường ID: {selectedWardId ?? 'Chưa chọn'}</p>
      </div> */}
		</>
	);
}
