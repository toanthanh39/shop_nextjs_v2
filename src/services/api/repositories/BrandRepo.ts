import { BaseCollectionJson, IBaseRepository } from "@/types/Base.type";
import { BrandJson } from "@/types/Brand.type";
import { StoryFilter } from "@/types/Story.type";

import Helper from "@/utils/helper";

import BaseRepository from "./BaseRepository";

class BrandRepo extends BaseRepository implements IBaseRepository<BrandJson> {
	private static instance: BrandRepo;

	public static getInstance(): BrandRepo {
		if (!BrandRepo.instance) {
			BrandRepo.instance = new BrandRepo();
		}
		return BrandRepo.instance;
	}
	private readonly pathname = this.BASE_URL_V1 + "/brands/public";

	constructor() {
		super();
		// if (params) {
		// 	this.accessMode = params.accessMode;
		// }
	}

	async getAll(filter: StoryFilter) {
		return this.getClientOrServer().get<BaseCollectionJson<BrandJson>>(
			this.pathname,
			{
				params: Helper.convertParams(filter),
			}
		);
	}

	async getOne(id: number | string) {
		return this.getClientOrServer().get<BrandJson>(this.pathname + "/" + id);
	}
}

export default BrandRepo;
