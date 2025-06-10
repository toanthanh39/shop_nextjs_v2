import {
	BaseCollectionJson,
	BaseRepoParams,
	IBaseRepository,
} from "@/types/Base.type";
import { ProductFilter, ProductJson } from "@/types/Product.type";

import Helper from "@/utils/helper";

import BaseRepository from "./BaseRepository";

const TIME_CACHE = 60 * 60;

class ProductRepo
	extends BaseRepository
	implements BaseRepoParams, IBaseRepository<ProductJson>
{
	private static instance: ProductRepo;
	private readonly URLS = {
		PUBLIC: process.env.NEXT_PUBLIC_API_BASE_URL_V2 + "/products/public",
		ADMIN: process.env.NEXT_PUBLIC_API_BASE_URL_V2 + "/products/admin",
	};

	accessMode: BaseRepoParams["accessMode"];

	public static getInstance(params: BaseRepoParams): ProductRepo {
		if (!ProductRepo.instance) {
			ProductRepo.instance = new ProductRepo(params);
		} else {
			ProductRepo.instance.accessMode = params.accessMode;
		}
		return ProductRepo.instance;
	}

	constructor(params: BaseRepoParams) {
		super();
		this.accessMode = params.accessMode;
	}

	private getCorrectURL(suffix = "") {
		switch (this.accessMode) {
			case "PRIVATE":
				return this.URLS.ADMIN + suffix;

			default:
				return this.URLS.PUBLIC + suffix;
		}
	}

	async getOne(id: number | string) {
		const clientOrServer = this.getClientOrServer();
		const url = this.getCorrectURL() + `/${id}`;

		return clientOrServer.get<ProductJson>(url, {
			cache: "force-cache",
			next: {
				revalidate: TIME_CACHE,
			},
		});
	}

	async getAll(filter: ProductFilter) {
		const clientOrServer = this.getClientOrServer();
		const url = this.getCorrectURL();

		return clientOrServer.get<BaseCollectionJson<ProductJson>>(url, {
			params: Helper.convertParams(filter),
			cache: "force-cache",
			next: {
				revalidate: TIME_CACHE,
			},
		});
	}

	async getAllAdmin(filter: ProductFilter) {
		const url = this.getCorrectURL();
		return this.getClientOrServer().get<BaseCollectionJson<ProductJson>>(url, {
			params: Helper.convertParams(filter),
		});
	}
}

export default ProductRepo;
