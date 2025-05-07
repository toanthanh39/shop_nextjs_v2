import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/features/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			zIndex: {
				header: "1001",
				footer: "1001",
				modal: "3001",
				tooltip: "4001",
			},
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				whitesmoke: "#fff",
				colors: {
					gray: {
						1: "#f6e9e9",
						2: "#f7f7f7",
						3: "#d8d7d8",
						4: "#898889",
						5: "#3a393a",
					},
					red: {
						5: "#d72229",
					},
					blue: {
						5: "#004b8f",
					},
				},
			},
			fontFamily: {
				inter: ["Inter", "sans-serif"],
				noto: ["Noto Serif Display", "serif"],
			},
			fontSize: {
				base: "14px",
				sm: "12px",
			},

			keyframes: {
				"modal-up": {
					"0%": { transform: "translateY(-50%)", opacity: "1" },
					"100%": { transform: "translateY(-100%)", opacity: "0" },
				},
				"modal-down": {
					"0%": { transform: "translateY(-100%)", opacity: "0" },
					"100%": { transform: "translateY(-50%)", opacity: "1" },
				},

				"drawer-up": {
					"0%": { transform: "translate(-50% , -0%)", opacity: "0" },
					"100%": { transform: "translate(-50% , -0%)", opacity: "1" },
				},
				"drawer-down": {
					"0%": { transform: "translate(-50%,-0%)", opacity: "1" },
					"100%": { transform: "translate(-50% , -0%)", opacity: "0" },
				},

				fade: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				fadeOut: {
					"0%": { opacity: "1" },
					"100%": { opacity: "0" },
				},

				fadeInUp: {
					"0%": { opacity: "0", transform: "translateY(60px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				borderTop: {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(100%)" },
				},
				borderRight: {
					"0%": { transform: "translateY(-100%)" },
					"100%": { transform: "translateY(100%)" },
				},
				borderBottom: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(-100%)" },
				},
				borderLeft: {
					"0%": { transform: "translateY(100%)" },
					"100%": { transform: "translateY(-100%)" },
				},
				spin: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"modal-up": "modal-up 0.3s  forwards ",
				"modal-down": "modal-down 0.3s forwards ",
				"drawer-up": "drawer-up 0.3s forwards ",
				"drawer-down": "drawer-down 0.3s ",
				fade: "fade 0.3s ease-in-out forwards",
				fadeOut: "fadeOut 0.3s ease-in-out forwards",
				fadeInUp: "fadeInUp 0.3s linear forwards",
				"spin-slow": "spin 3s linear infinite",
			},
		},
		container: {
			center: true,
			// screens: {
			// 	sm: "640px",
			// 	md: "768px",
			// 	lg: "1024px",
			// 	xl: "1180px",
			// 	"2xl": "1280px", // Ghi đè giá trị cho '2xl'
			// },
			screens: {
				sm: "590px", // 640 - 50
				md: "718px", // 768 - 50
				lg: "974px", // 1024 - 50
				xl: "1130px", // 1180 - 50
				"2xl": "1230px", // 1280 - 50
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		function ({ addUtilities }: { addUtilities: any }) {
			addUtilities({
				".hide-scroll-bar": {
					/* Ẩn thanh cuộn cho trình duyệt Webkit (Chrome/Safari) */
					"::-webkit-scrollbar": {
						display: "none",
					},
					/* Firefox */
					"scrollbar-width": "none",
					/* IE và Edge */
					"-ms-overflow-style": "none",
				},

				".container-padding": {
					"padding-left": "12px",
					"padding-right": "12px",
				},
			});
		},
	],
} satisfies Config;
