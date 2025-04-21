import { useCallback, useState } from "react";

export default function useToggle(initialState?: boolean) {
	const [state, setState] = useState(initialState ?? false);
	const toggle = useCallback(() => {
		setState((state) => !state);
	}, [state]);
	return {
		state,
		toggle,
	};
}
