import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/// Merge class names and remove duplicates
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Check if the current server time is within the active date range
export const initArray = <T>(current: number, defaultData: T) => {
	return Array.from(new Array(current)).map((i) => defaultData);
};

//////////////////////////////////////////////////////////////////////////////
// Check if the current server time is within the active date range
export const checkActiveDate = (
	server: number,
	from: number,
	to: number
): boolean => {
	const serverTime = server ?? 0;

	if (serverTime <= 0 || (from <= 0 && to <= 0)) {
		return true;
	}

	const isFromValid = from > 0 && serverTime >= from;
	const isToValid = to > 0 && serverTime <= to;

	return from > 0 && to > 0
		? isFromValid && isToValid
		: isFromValid || isToValid;
};

type DebounceFunction<T extends (...args: any[]) => any> = (
	...args: Parameters<T>
) => void;

//////////////////////////////////////////////////////////////////////////////
// Debounce function to limit the rate at which a function can fire
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number,
	immediate: boolean = false
): DebounceFunction<T> {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return function executedFunction(...args: Parameters<T>) {
		const later = () => {
			timeout = null;

			if (!immediate) func(...args);
		};

		const callNow = immediate && !timeout;

		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(later, wait);

		if (callNow) func(...args);
	};
}

export const delay = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));


/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
type RedirectProps = {
	path: string;
	query: Record<string, string | number>;
	prefix?: string;
};

//////////////////////////////////////////////////////////////////////////////
// Redirects to a specified path with an encoded message as a query parameter.
export function encodedQueryParams({
	query,
	path,
	prefix = "?",
}: RedirectProps) {
	const params = new URLSearchParams();
	for (const key in query) {
		const value = query[key];
		if (
			typeof value === "number" ||
			(typeof value === "string" && value.length > 0)
		) {
			params.append(key, value.toString());
		}
	}
	if (params.toString().length > 0) {
		return `${path}${prefix}${params.toString()}`;
	}
	return path;
}
