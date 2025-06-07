import { NextResponse, type NextRequest } from "next/server";

import { initSiteSetting } from "./config/middleware";

export async function middleware(request: NextRequest) {
	const response = NextResponse.next();
	const res = await initSiteSetting(request, response);

	return res;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
		 * Feel free to modify this pattern to include more paths.
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
