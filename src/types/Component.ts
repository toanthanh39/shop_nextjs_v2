export interface ComProps {
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	isLoading?: boolean;
}

export interface ComDataSource<D> {
	dataSource: D[];
}

export interface HookCacheProps {
	enabled?: boolean;
	staleTime?: number | typeof Infinity;
}
