import { useState, useCallback } from "react";

type UseLoadingReturn<T extends (...args: any[]) => Promise<any>> = [
	boolean,
	(...args: Parameters<T>) => Promise<ReturnType<T>>
];

/**
 * Custom hook to manage loading state for async functions
 * @param asyncFunction - The async function to wrap with loading state
 * @returns - [isLoading, wrappedAsyncFunction]
 */
function useLoading<T extends (...args: any[]) => Promise<any>>(
	asyncFunction: T
): UseLoadingReturn<T> {
	const [isLoading, setIsLoading] = useState(false);

	const wrappedAsyncFunction = useCallback(
		async (...args: Parameters<T>): Promise<ReturnType<T>> => {
			setIsLoading(true);
			try {
				const result = await asyncFunction(...args);
				return result;
			} catch (error) {
				// Optionally handle the error here
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[asyncFunction]
	);

	return [isLoading, wrappedAsyncFunction];
}

export default useLoading;
