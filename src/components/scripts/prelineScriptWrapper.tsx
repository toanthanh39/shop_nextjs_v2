"use client";

import dynamic from "next/dynamic";

const PrelineScript = dynamic(
	() => import("@/components/scripts/prelineScript"),
	{
		ssr: false,
	}
);

export default function PrelineScriptWrapper() {
	return <PrelineScript />;
}
