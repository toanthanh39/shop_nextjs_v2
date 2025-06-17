import { BaseCollectionJson, IBaseRepository } from "@/types/Base.type";
import { LocationItemJson } from "@/types/Location.type";
import { StoryFilter } from "@/types/Story.type";

import BaseRepository from "./BaseRepository";
import Helper from "@/utils/helper";

class LocationRepo
	extends BaseRepository
	implements IBaseRepository<LocationItemJson>
{
	private static instance: LocationRepo;

	public static getInstance(): LocationRepo {
		if (!LocationRepo.instance) {
			LocationRepo.instance = new LocationRepo();
		}
		return LocationRepo.instance;
	}
	private readonly pathname = this.BASE_URL_V1 + "/locations/public/type";

	constructor() {
		super();
		// if (params) {
		// 	this.accessMode = params.accessMode;
		// }
	}

	async getAll(filter: StoryFilter) {
		return this.getClientOrServer().get<BaseCollectionJson<LocationItemJson>>(
			this.pathname,
			{
				params: Helper.convertParams(filter),
			}
		);
	}

	async getOne(id: number | string) {
		return this.getClientOrServer().get<LocationItemJson>(
			this.pathname + "/" + id
		);
	}
}

export default LocationRepo;
