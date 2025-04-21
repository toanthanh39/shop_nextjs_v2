import { useRef, useEffect, useCallback } from "react";
import axios, { CancelToken } from "axios";

interface CancelTokenFunction {
	(): CancelToken;
}
interface CancelTokenSource {
	token: CancelToken;
	cancel: (reason?: string) => void;
}
interface UseCancelTokenResult {
	newCancelToken: CancelTokenFunction;
	isCancel: (error: any) => boolean;
	setCancel: () => void;
}

export const useCancelToken = (): UseCancelTokenResult => {
	const axiosSource = useRef<CancelTokenSource | null>(null);

	const newCancelToken: CancelTokenFunction = useCallback(() => {
		axiosSource.current = axios.CancelToken.source();
		return axiosSource.current.token;
	}, []);

	const isCancel = (error: any): boolean => {
		return axios.isCancel(error);
	};

	const setCancel = () => {
		if (axiosSource.current) axiosSource.current.cancel();
	};

	useEffect(() => {
		return () => {
			if (axiosSource.current) axiosSource.current.cancel();
		};
	}, []);

	return { newCancelToken, isCancel, setCancel };
};
