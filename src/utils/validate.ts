export function validateInput(input: string) {
	// Loại bỏ khoảng trắng ở đầu và cuối chuỗi
	input = input.trim();

	// Loại bỏ các ký tự đặc biệt và dấu tiếng Việt
	input = input.replace(/[^a-zA-Z0-9\s]/g, "");

	// Loại bỏ dấu tiếng Việt
	input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

	// Loại bỏ các mã script (ví dụ: <script>...</script>)
	input = input.replace(/<script\b[^>]*>(.*?)<\/script>/gi, "");

	return input;
}
