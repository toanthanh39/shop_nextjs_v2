import { BaseCollectionJson, BaseRepoParams } from "@/types/Base.type";
import { OrderFilter, OrderJson } from "@/types/Order.type";

import Helper from "@/utils/helper";

import BaseRepository from "./BaseRepository";

type InvoiceJson = OrderJson;

class InvoiceRepo extends BaseRepository<OrderJson> implements BaseRepoParams {
	private static instance: InvoiceRepo;
	// private accessMode: BaseAccessMode;

	private readonly URLS = {
		PUBLIC: "/orders/public/invoice",
		PRIVATE: "/orders/invoice",
	};
	accessMode: BaseRepoParams["accessMode"];

	public static getInstance(params: BaseRepoParams): InvoiceRepo {
		if (!InvoiceRepo.instance) {
			InvoiceRepo.instance = new InvoiceRepo(params);
		}
		return InvoiceRepo.instance;
	}

	constructor(params: BaseRepoParams) {
		super();
		this.accessMode = params.accessMode;
	}

	private getCorrectURL(suffix = "") {
		switch (this.accessMode) {
			case "PRIVATE":
				return this.URLS.PRIVATE + suffix;

			default:
				return this.URLS.PUBLIC + suffix;
		}
	}

	async getOne(id: number | string) {
		return this.getClientOrServer().get<InvoiceJson>(
			this.getCorrectURL() + "/token/" + id
		);
	}

	async getAll(filter: OrderFilter) {
		return this.getClientOrServer().get<BaseCollectionJson<OrderJson>>(
			this.getCorrectURL(),
			{
				params: Helper.convertParams(filter),
			}
		);
	}
}

export default InvoiceRepo;
