const motionConfig = {
	fade: {
		initial: { opacity: 0, y: 0, scale: 0.8 }, // Trạng thái ban đầu (mờ và lệch xuống)
		animate: { opacity: 1, y: 0, scale: 1 }, // Trạng thái khi xuất hiện (rõ và đúng vị trí)
		exit: { opacity: 0, y: 0, scale: 0.8 }, // Trạng thái khi biến mất (mờ và lệch lên)
		transition: { duration: 0.3 }, // Thời gian animation
	},
};

export { motionConfig };
