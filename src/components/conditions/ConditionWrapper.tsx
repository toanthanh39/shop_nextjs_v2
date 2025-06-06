import { ComProps } from "@/types/Component";

type Props = ComProps & {
	condition: boolean;
};
export default function ConditionWrapper({ condition, children }: Props) {
	if (!condition) return null;
	return <>{children}</>;
}
