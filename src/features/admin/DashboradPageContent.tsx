// app/dashboard/page.tsx (hoặc src/app/dashboard/page.tsx)
"use client"; // Đây là Client Component

import React from "react";
import WithAuth from "../auth/WithAuth";
import { useSession } from "next-auth/react";
const DashboardPageContent: React.FC = () => {
	const { data: session } = useSession(); // Có thể lấy session ở đây
	console.log("🚀 ~ session:", session);

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome, {session?.user?.name || "Guest"}!</p>
			<p>This is a protected page.</p>
			{/* ... nội dung trang dashboard của bạn */}
		</div>
	);
};

// Export component đã được bọc bởi HOC
export const DashboardPageContentAuth = WithAuth(DashboardPageContent);
