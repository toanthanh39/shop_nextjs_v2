"use client";

// Optional third-party libraries
import $ from "jquery";
import _ from "lodash";
import { usePathname } from "next/navigation";
import noUiSlider from "nouislider";
import { useEffect } from "react";
import "datatables.net";
import "dropzone/dist/dropzone-min.js";
import * as VanillaCalendarPro from "vanilla-calendar-pro";

window._ = _;
window.$ = $;
window.jQuery = $;
window.DataTable = $.fn.dataTable;
window.noUiSlider = noUiSlider;
window.VanillaCalendarPro = VanillaCalendarPro;

// Preline UI
async function loadPreline() {
	return import("preline/dist/index.js");
}

export default function PrelineScript() {
	const path = usePathname();

	useEffect(() => {
		const initPreline = async () => {
			await loadPreline();
		};

		initPreline();
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (
				typeof window !== "undefined" &&
				window.HSStaticMethods &&
				typeof window.HSStaticMethods.autoInit === "function"
			) {
				window.HSStaticMethods.autoInit([
					"dropdown",
					"tab",
					"collapse",
					"accordion",
					"modal",
					"offcanvas",
					"tooltip",
					"popover",
					"select",
					"datepicker",
					"counter",
					"countup",
					"scrollspy",
					"scroll-animation",
					"scroll-to-top",
					"scroll-to-target",
					"form-validation",
					"Popover",
					"Toasts",
					"toasts",
					"Toast",
					"toast",
				]);
			}
		}, 100);
	}, [path]);

	return null;
}
