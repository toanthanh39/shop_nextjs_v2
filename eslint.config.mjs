import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import unusedImports from "eslint-plugin-unused-imports";

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
			"react/jsx-no-literals": ["warn", { noStrings: true }],
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
];

export default eslintConfig;
