export interface ComProps {
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	isLoading?: boolean;
	layout?: React.ComponentType<{ children: React.ReactNode }>;
}

export interface ComDataSource<D> {
	dataSource: D[];
	render?: (i: D, index: number) => React.ReactNode;
}

export interface HookCacheProps {
	enabled?: boolean;
	staleTime?: number | typeof Infinity;
}
//////////////////////////////////////////
// UI component types
export type DateStatusResultJson = {
	status: "waiting" | "running" | "expired";
	remainingDays: number;
};
