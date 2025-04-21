import {
	BaseAccessMode,
	BaseCollectionJson,
	BaseRepoParams,
} from "@/types/Base.type";
import BaseRepository from "./BaseRepository";
import Helper from "@/utils/helper";
import client from "@/lib/core/client";
import server from "@/lib/core/server";
import { StoreFilter, StoreJson } from "@/types/Store.type";

class StoreRepo extends BaseRepository<StoreJson> implements BaseRepoParams {
	private static instance: StoreRepo;
	private readonly URLS = {
		PUBLIC: "/stores/public",
	};

	accessMode: BaseRepoParams["accessMode"];

	public static getInstance(params: BaseRepoParams): StoreRepo {
		if (!StoreRepo.instance) {
			StoreRepo.instance = new StoreRepo(params);
		} else {
			StoreRepo.instance.accessMode = params.accessMode;
		}
		return StoreRepo.instance;
	}

	constructor(params: BaseRepoParams) {
		super();
		this.accessMode = params.accessMode;
	}

	private getCorrectURL(suffix = "") {
		switch (this.accessMode) {
			case "PUBLIC":
				return this.URLS.PUBLIC + suffix;
			default:
				throw new Error("Invalid access mode");
		}
	}

	async getAll(filter: StoreFilter) {
		const clientOrServer = this.getClientOrServer();
		const url = this.getCorrectURL();
		return clientOrServer.get<BaseCollectionJson<StoreJson>>(url, {
			params: Helper.convertParams(filter),
		});
	}

	async getOne(id: number | string) {
		const clientOrServer = this.getClientOrServer();
		const url = this.getCorrectURL(`/${id}`);
		return clientOrServer.get<StoreJson>(url);
	}
}

export default StoreRepo;
