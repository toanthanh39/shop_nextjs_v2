import { useQuery } from "@tanstack/react-query";
import { LocationItemJson } from "@/types/Location.type";
import { SelectOption } from "@/types/Global.type";
import LocationRepo from "@/services/api/repositories/LocationRepo";

interface UseLocationOptionsProps {
	parentId?: number | null; // ID của cấp cha (ví dụ: ID của Thành phố để lấy Quận/Huyện)
	code?: string | null; // Code của địa điểm (nếu API cần)
	enabled?: boolean; // Tùy chọn để bật/tắt query
	isCountryLevel?: boolean; // Mới: Để chỉ định rằng đây là cấp quốc gia (ví dụ: Tỉnh/Thành phố)
}
const CACHE_KEY_COUNTRY = "locationCountryVN";
const PROVINCE_PREFIX_REGEX = /^Tỉnh\s+/;

export const useLocationOptions = ({
	parentId = null,
	code = null,
	enabled = true,
	isCountryLevel,
}: UseLocationOptionsProps) => {
	const LocationInstance = new LocationRepo();

	// --- Bổ sung logic lấy ID của Việt Nam ---
	// Sử dụng một useQuery riêng biệt để fetch thông tin Việt Nam
	const { data: countryData, isLoading: isLoadingCountry } = useQuery<
		LocationItemJson[],
		Error,
		LocationItemJson | undefined
	>({
		queryKey: [CACHE_KEY_COUNTRY],
		queryFn: async () =>
			(await LocationInstance.getAll({ type: 0, parent_id: 0, code: "VN" }))
				.items, // API để lấy quốc gia
		enabled: isCountryLevel, // Chỉ chạy query này khi cần lấy cấp quốc gia
		staleTime: Infinity, // Dữ liệu quốc gia hiếm khi thay đổi, cache vô hạn
		gcTime: Infinity, // Giữ trong cache mãi mãi
		select: (data) => data?.[0], // Chỉ lấy đối tượng quốc gia đầu tiên nếu có
	});
	// --- Kết thúc logic lấy ID của Việt Nam ---

	// Nếu là cấp quốc gia (ví dụ: fetch Provinces), dùng ID của Việt Nam.
	const actualParentId = isCountryLevel
		? (countryData?.location_id ?? null)
		: parentId;

	// Query key phụ thuộc vào parentId, code, và sự hiện diện của countryData (nếu là cấp quốc gia)
	// Đảm bảo refetch khi countryData có sẵn nếu isCountryLevel là true
	const queryKey = ["locations", actualParentId, code];
	const { data, isLoading, error, isFetching } = useQuery<
		LocationItemJson[],
		Error,
		SelectOption[]
	>({
		queryKey: queryKey,
		queryFn: async () => {
			try {
				const res = await LocationInstance.getAll({
					parent_id: actualParentId,
					type: 1,
				});
				return res.items;
			} catch (error) {
				throw error;
			}
		},
		// `select` transformation: Chuyển đổi dữ liệu thô từ API thành định dạng SelectOption
		select: (data: LocationItemJson[]) => {
			return data
				.map((item) => ({
					value: item.location_id,
					label: item.name,
				}))
				.sort((a, b) => {
					const cleanLabelA = a.label.replace(PROVINCE_PREFIX_REGEX, "");
					const cleanLabelB = b.label.replace(PROVINCE_PREFIX_REGEX, "");

					return cleanLabelA.localeCompare(cleanLabelB);
				});
		},
		// `enabled` sẽ kiểm soát khi nào query được chạy.
		// Nếu enabled là false, query sẽ không chạy và trạng thái sẽ là 'idle'.
		enabled:
			enabled &&
			(!isCountryLevel || (isCountryLevel && !!countryData)) &&
			!isLoadingCountry,
		staleTime: 1000 * 60 * 5, // Dữ liệu được coi là stale sau 5 phút
		gcTime: 1000 * 60 * 10, // Dữ liệu được giữ trong cache 10 phút sau khi không có observers
		refetchOnWindowFocus: false, // Tùy chọn: không refetch khi focus lại cửa sổ
		retry: 3, // Thử lại 3 lần cho các lỗi mạng, v.v.
	});

	return {
		options: data, // Danh sách các SelectOption
		isLoading: isLoading || isFetching || (isCountryLevel && isLoadingCountry), // Tổng hợp trạng thái tải
		error,
	};
};
