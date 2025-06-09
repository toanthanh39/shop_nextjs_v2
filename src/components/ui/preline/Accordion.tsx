"use client";
export default function Accordion() {
	return (
		<div className="w-full bg-white rounded-lg shadow-md dark:bg-neutral-800">
			<div className="hs-accordion-group">
				<div className="hs-accordion active" id="hs-basic-heading-one">
					<button
						className="hs-accordion-toggle hs-accordion-active:text-blue-600 px-6 py-3 inline-flex items-center gap-x-3 text-sm w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
						aria-expanded="true"
						aria-controls="hs-basic-collapse-one">
						<svg
							className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M5 12h14"></path>
							<path d="M12 5v14"></path>
						</svg>
						<svg
							className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M5 12h14"></path>
						</svg>
						Accordion #1
					</button>
					<div
						id="hs-basic-collapse-one"
						className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
						role="region"
						aria-labelledby="hs-basic-heading-one">
						<div className="pb-4 px-6">
							<p className="text-sm text-gray-600 dark:text-neutral-200">
								It is hidden by default, until the collapse plugin adds the
								appropriate classes that we use to style each element.
							</p>
						</div>
					</div>
				</div>

				<div className="hs-accordion" id="hs-basic-heading-two">
					<button
						className="hs-accordion-toggle hs-accordion-active:text-blue-600 px-6 py-3 inline-flex items-center gap-x-3 text-sm w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
						aria-expanded="false"
						aria-controls="hs-basic-collapse-two">
						<svg
							className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M5 12h14"></path>
							<path d="M12 5v14"></path>
						</svg>
						<svg
							className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M5 12h14"></path>
						</svg>
						Accordion #2
					</button>
					<div
						id="hs-basic-collapse-two"
						className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
						role="region"
						aria-labelledby="hs-basic-heading-two">
						<div className="pb-4 px-6">
							<p className="text-sm text-gray-600 dark:text-neutral-200">
								It is hidden by default, until the collapse plugin adds the
								appropriate classes that we use to style each element.
							</p>
						</div>
					</div>
				</div>

				<div className="hs-accordion" id="hs-basic-heading-three">
					<button
						className="hs-accordion-toggle hs-accordion-active:text-blue-600 px-6 py-3 inline-flex items-center gap-x-3 text-sm w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
						aria-expanded="false"
						aria-controls="hs-basic-collapse-three">
						<svg
							className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M5 12h14"></path>
							<path d="M12 5v14"></path>
						</svg>
						<svg
							className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M5 12h14"></path>
						</svg>
						Accordion #3
					</button>
					<div
						id="hs-basic-collapse-three"
						className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
						role="region"
						aria-labelledby="hs-basic-heading-three">
						<div className="pb-4 px-6">
							<p className="text-sm text-gray-600 dark:text-neutral-200">
								It is hidden by default, until the collapse plugin adds the
								appropriate classes that we use to style each element.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
