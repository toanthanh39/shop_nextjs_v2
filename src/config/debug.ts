import Helper from "@/utils/helper";

export const debugServer = (
	url: string,
	res: any,
	status: number,
	exuctionTime: any,
	type?: "error" | "res"
) => {
	const typeLog = type ?? "res";
	if (Helper.isDebug()) {
		if (typeLog === "res") {
			console.info("FetchResponse:", {
				URL: url,
				HTTP_Status: status,
				Data: JSON.parse(JSON.stringify(res, null, 2)),
				ExecutionTime: exuctionTime,
			});
		} else {
			console.error("FetchErrors:", {
				URL: url,
				HTTP_Status: status,
				Data: JSON.parse(JSON.stringify(res, null, 2)),
				ExecutionTime: exuctionTime,
			});
		}
	}
};
