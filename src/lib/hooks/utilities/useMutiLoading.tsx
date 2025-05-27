import { useState, useCallback } from "react";

type LoadingState = Record<string, boolean>;
type AsyncFunction = (...args: any[]) => Promise<any>;

interface UseMultiLoadingResult {
	isLoading: (key: string) => boolean;
	withLoading: (
		key: string,
		asyncFunc: AsyncFunction
	) => (...args: any[]) => Promise<any>;
}

/**
 * Custom hook to manage loading states for multiple async functions
 */
function useMultiLoading(): UseMultiLoadingResult {
	const [loadingState, setLoadingState] = useState<LoadingState>({});

	const isLoading = useCallback(
		(key: string) => !!loadingState[key],
		[loadingState]
	);

	const withLoading = useCallback((key: string, asyncFunc: AsyncFunction) => {
		return async (...args: any[]) => {
			setLoadingState((prev) => ({ ...prev, [key]: true }));
			try {
				const result = await asyncFunc(...args);
				return result;
			} finally {
				setLoadingState((prev) => ({ ...prev, [key]: false }));
			}
		};
	}, []);

	return { isLoading, withLoading };
}

export default useMultiLoading;
