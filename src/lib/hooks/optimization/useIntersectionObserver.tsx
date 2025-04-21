"use client";
import Helper from "@/utils/helper";
import { Ref, useEffect, useMemo, useRef, useState } from "react";

type IntersectionObserverInit = {
	root?: Element | null;
	rootMargin?: string;
	threshold?: number | number[];
};

type Props = {
	processEntry?: (entry: IntersectionObserverEntry) => void;
	options?: IntersectionObserverInit;
	enable?: boolean;
};
export default function useIntersectionObserver({
	options = {},
	enable = true,
	processEntry,
}: Props) {
	const ref = useRef<HTMLElement | HTMLDivElement | any>(null);
	const callbackRef = useRef<(entry: any) => void>(() => {});
	const setCallback = (
		callback: (entry: IntersectionObserverEntry) => void
	) => {
		callbackRef.current = callback;
	};

	useEffect(() => {
		if (!enable) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					processEntry?.(entry);
					// setCallback(entry);
					observer.disconnect(); // Dừng theo dõi sau khi phần tử đã giao nhau
				}
			},
			{ ...options }
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, [enable]);

	return { ref, setCallback } as const;
}
