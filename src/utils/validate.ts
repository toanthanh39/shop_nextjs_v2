class Validate {
	static validateInput(input: string) {
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

	static validateKey(str: string) {
		// Chuyển đổi chuỗi sang chữ thường
		str = str.toLowerCase();

		// Loại bỏ các dấu tiếng Việt
		str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

		// Thay thế các ký tự đặc biệt bằng dấu gạch ngang
		str = str.replace(/[^a-z0-9\s-]/g, "_");

		// Thay thế khoảng trắng và dấu gạch ngang liên tiếp bằng một dấu gạch ngang
		str = str.trim().replace(/\s+/g, "-").replace(/-+/g, "_");

		return str;
	}
}

export default Validate;
