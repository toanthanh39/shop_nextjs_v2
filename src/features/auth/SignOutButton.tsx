"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui";

import { onSignOutAction } from "@/actions/auth-actions";

export default function SignOutButton() {
	const t = useTranslations("global.auth");
	const router = useRouter();
	const queryClient = useQueryClient();

	const onSignOut = async () => {
		try {
			const currentUrl = window.location.pathname;
			await onSignOutAction(currentUrl);
			// Clear react-query cache
			queryClient.clear();
			// router.prefetch("/", { kind: PrefetchKind.FULL });
			// Manually reload page to reset app state and session info
			// This ensures useSession hook and all client logic updated
			// window.location.href = "/";
			// window.location.reload();
		} catch (error) {
			console.log("🚀 ~ onSignOut ~ error:", error);
		}
	};
	return <Button onClick={onSignOut}>{t("signout_label")}</Button>;
}
