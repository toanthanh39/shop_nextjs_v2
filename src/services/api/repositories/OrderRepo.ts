import client from "@/lib/core/client";
import {
	BaseCollectionJson,
	BaseRepoParams,
	IBaseRepository,
} from "@/types/Base.type";
import { OrderCreate, OrderFilter, OrderJson } from "@/types/Order.type";

import Helper from "@/utils/helper";

import BaseRepository from "./BaseRepository";

class OrderRepo
	extends BaseRepository
	implements BaseRepoParams, IBaseRepository<OrderJson>
{
	private static instance: OrderRepo;
	private readonly pathname = "/orders";

	accessMode: BaseRepoParams["accessMode"];

	public static getInstance(params: BaseRepoParams): OrderRepo {
		if (!OrderRepo.instance) {
			OrderRepo.instance = new OrderRepo(params);
		}

		return OrderRepo.instance;
	}

	constructor(params: BaseRepoParams) {
		super();
		this.accessMode = params.accessMode;
	}

	async getAll(filter: OrderFilter) {
		return this.getClientOrServer().get<BaseCollectionJson<OrderJson>>(
			this.pathname,
			{
				params: Helper.convertParams(filter),
			}
		);
	}

	async getOne(id: number | string) {
		return this.getClientOrServer().get<OrderJson>(this.pathname + "/" + id);
	}

	async create(data: OrderCreate) {
		switch (this.accessMode) {
			case "PRIVATE":
				return client.post<OrderJson>(this.pathname + "/cart/order", data);

			default:
				// throw new Error("Invalid access mode");

				return client.post<OrderJson>(
					this.pathname + "/cart/public/order",
					data
				);
		}
	}
}

export default OrderRepo;
