const motionConfig = {
	fade: {
		initial: { opacity: 0, y: 0, scale: 0.8 }, // Trạng thái ban đầu (mờ và lệch xuống)
		animate: { opacity: 1, y: 0, scale: 1 }, // Trạng thái khi xuất hiện (rõ và đúng vị trí)
		exit: { opacity: 0, y: 0, scale: 0.8 }, // Trạng thái khi biến mất (mờ và lệch lên)
		transition: { duration: 0.5 }, // Thời gian animation
		whileInView: { opacity: 1 }, // Khi vào viewport, opacity = 1
		viewport: { once: true, amount: 0.8 }, // Chỉ chạy 1 lần, khi 80% component trong view
	},

	fadeY: {
		initial: { opacity: 0, y: -30 }, // Trạng thái ban đầu (mờ và lệch xuống)
		animate: { opacity: 1, y: 0 }, // Trạng thái khi xuất hiện (rõ và đúng vị trí)
		exit: { opacity: 0, y: 0 }, // Trạng thái khi biến mất (mờ và lệch lên)
		transition: { duration: 0.5 }, // Thời gian animation
		whileInView: { opacity: 1 }, // Khi vào viewport, opacity = 1
		viewport: { once: true, amount: 0.8 }, // Chỉ chạy 1 lần, khi 80% component trong view
	},

	slideUp: {
		initial: { y: 50, opacity: 0 }, // Bắt đầu từ dưới và ẩn
		animate: { y: 0, opacity: 1 },
		exit: { y: 50, opacity: 0 },
		transition: { duration: 0.5 },
		// Cấu hình cho animation khi vào viewport
		whileInView: { y: 0, opacity: 1 }, // Khi vào viewport, di chuyển lên và hiện ra
		viewport: { once: true, amount: 1 }, // Chỉ chạy 1 lần, khi 60% component trong view
	},
} as const;
export type MotionKey = keyof typeof motionConfig;
const getMotionConfig = (animate: MotionKey) => {
	return motionConfig[animate];
};

export { motionConfig, getMotionConfig };
