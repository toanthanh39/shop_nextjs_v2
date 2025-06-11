import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import"; // Import plugin-import
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		ignores: [
			".next/",
			"node_modules/",
			"dist/",
			"build/",
			"public/",
			"out/",
			"*.d.ts", // Bỏ qua các file định nghĩa kiểu TypeScript
		],
	},
	{
		// parser: "@typescript-eslint/parser",
		rules: {
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					args: "all",
					argsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					ignoreRestSiblings: true,
				},
			],
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-empty-interface": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"react/jsx-no-literals": ["off", { noStrings: true }],
			"rules-of-hooks/rules-of-hooks": "off", // Đây là quy tắc bạn muốn tắt
			// "react-hooks/rules-of-hooks": "off", // Tên quy tắc phổ biến hơn
			"react/no-unknown-property": [
				"error", // Hoặc "warn" nếu bạn chỉ muốn cảnh báo
				{
					ignore: [
						// Thêm các thuộc tính mà bạn muốn bỏ qua kiểm tra camelCase tại đây nếu có
						// Ví dụ: nếu bạn có thuộc tính data-test-id hoặc aria-hidden mà bạn không muốn ESLint can thiệp
						// Nhưng đối với aria-controls và stroke-width, bạn KHÔNG NÊN ignore
					],
				},
			],
		},
	},

	// Cấu hình eslint-plugin-unused-imports
	{
		files: ["**/*.{js,jsx,ts,tsx}"], // Áp dụng cho các loại file này
		plugins: {
			"unused-imports": unusedImports, // Đăng ký plugin
		},
		rules: {
			// Tắt quy tắc của ESLint và TypeScript để tránh xung đột
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "off",

			// Bật quy tắc của unused-imports
			"unused-imports/no-unused-imports": "error", // Báo lỗi khi có import không dùng
			"unused-imports/no-unused-vars": [
				"warn", // Báo warn thay vì error
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
		},
	},
	// Cấu hình eslint-plugin-import cho việc nhóm import
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		plugins: {
			import: importPlugin, // Đăng ký plugin import
		},
		rules: {
			// Bật quy tắc import/order
			"import/order": [
				"warn", // Hoặc "error" nếu bạn muốn nó là lỗi cứng
				{
					groups: [
						"builtin", // Node.js built-in modules (e.g. `fs`, `path`)
						"external", // External modules (npm packages)
						"internal", // Custom absolute paths (e.g. `@/components`)
						["parent", "sibling", "index"], // Relative imports
						"object", // Object imports
						"type", // Type imports (for TypeScript)
					],
					pathGroups: [
						// Components (ví dụ: nằm trong thư mục `components`)
						{
							pattern: "{./**/components/**,**/components/**}",
							group: "internal",
							position: "after",
						},
						// Constants, Utils, Hooks (nằm trong thư mục `constants`, `utils`, `hooks` ở root hoặc sâu hơn)
						{
							pattern:
								"{./**/constants/**,**/constants/**,./**/utils/**,**/utils/**,./**/hooks/**,**/hooks/**}",
							group: "internal",
							position: "after",
						},
						// Các module và function khác trong dự án (relative imports)
						{
							pattern: "./*",
							group: "sibling",
							position: "after",
						},
					],
					pathGroupsExcludedImportTypes: ["builtin"],
					"newlines-between": "always", // Luôn có một dòng trống giữa các nhóm
					alphabetize: {
						order: "asc", // Sắp xếp theo thứ tự bảng chữ cái trong mỗi nhóm
						caseInsensitive: true,
					},
				},
			],
			// Các quy tắc import khác bạn có thể muốn thêm
			"import/no-unresolved": "error", // Đảm bảo import path tồn tại
			"import/named": "error",
			"import/no-duplicates": "error", // Ngăn chặn import trùng lặp
		},
	},
];

export default eslintConfig;
