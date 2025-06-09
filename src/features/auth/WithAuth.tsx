"use client"; // Đảm bảo component này là Client Component

import React, { ComponentType, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Hoặc 'next/router' nếu dùng Pages Router
// import { Session } from 'next-auth'; // Import Session type

// Định nghĩa props mà component được bảo vệ có thể nhận
// HOC này không thay đổi props của WrappedComponent, nhưng bạn có thể thêm nếu cần
type WithAuthProps = {
	// Bạn có thể thêm các props bổ sung cho HOC tại đây, ví dụ:
	// allowedRoles?: string[];
	// redirectPath?: string;
};

// Định nghĩa một interface cho các props mặc định của WrappedComponent
// (nếu nó không nhận bất kỳ props nào đặc biệt từ HOC)
type WrappedComponentProps = {};

// HOC WithAuth
const WithAuth = <P extends WrappedComponentProps>(
	WrappedComponent: ComponentType<P>
) => {
	const ComponentWithAuth: React.FC<P & WithAuthProps> = (props) => {
		const { data: session, status } = useSession();
		const router = useRouter();

		const isAuthenticated = status === "authenticated";
		const isLoading = status === "loading";

		// Log để dễ debug
		// console.log('Auth status:', status);
		// console.log('Session:', session);

		useEffect(() => {
			// Nếu đang tải trạng thái hoặc không đăng nhập
			if (isLoading) {
				// Đợi session tải xong
				return;
			}

			// Nếu không đăng nhập và không phải đang tải
			if (!isAuthenticated) {
				// Chuyển hướng đến trang đăng nhập.
				// Bạn có thể tùy chỉnh đường dẫn này.
				// Ghi lại URL hiện tại để chuyển hướng lại sau khi đăng nhập thành công.
				router.push(
					`/api/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`
				);
				// Hoặc nếu bạn có trang đăng nhập tùy chỉnh:
				// router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`);
			}
		}, [isAuthenticated, isLoading, router]);

		// Hiển thị loading state hoặc spinner trong khi chờ xác thực
		if (isLoading) {
			return <div>Loading authentication...</div>; // Hoặc một spinner/loading component của bạn
		}

		// Nếu đã xác thực, render component được bảo vệ
		if (isAuthenticated) {
			return <WrappedComponent {...props} />;
		}

		// Nếu không xác thực và không loading (đã chuyển hướng), không render gì cả
		return null;
	};

	// Đặt displayName để dễ debug trong React DevTools
	ComponentWithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

	return ComponentWithAuth;
};

// Hàm trợ giúp để lấy displayName của component
function getDisplayName<P>(WrappedComponent: ComponentType<P>) {
	return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default WithAuth;
