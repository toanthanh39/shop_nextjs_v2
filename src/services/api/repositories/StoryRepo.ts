import {
	BaseCollectionJson,
	BaseRepoParams,
	IBaseRepository,
} from "@/types/Base.type";
import { StoryFilter, StoryJson } from "@/types/Story.type";

import Helper from "@/utils/helper";

import BaseRepository from "./BaseRepository";

class StoryRepo extends BaseRepository implements IBaseRepository<StoryJson> {
	private static instance: StoryRepo;
	private readonly pathname = this.BASE_URL_V1 + "/stories/public";

	accessMode: BaseRepoParams["accessMode"] = "PUBLIC";
	public static getInstance(): StoryRepo {
		if (!StoryRepo.instance) {
			StoryRepo.instance = new StoryRepo();
		}
		return StoryRepo.instance;
	}

	constructor() {
		super();
	}

	async getAll(filter: StoryFilter) {
		return this.getClientOrServer().get<BaseCollectionJson<StoryJson>>(
			this.pathname,
			{
				params: Helper.convertParams(filter),
			}
		);
	}

	async getOne(id: number | string) {
		return this.getClientOrServer().get<StoryJson>(this.pathname + "/" + id);
	}
}

export default StoryRepo;
