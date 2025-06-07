import { BaseCollectionJson } from "@/types/Base.type";
import { VideoFilter, VideoJson } from "@/types/Video.type";

import Helper from "@/utils/helper";

import BaseRepository from "./BaseRepository";

const CACHE_TIME = 60 * 60;
class VideoRepo extends BaseRepository<VideoJson> {
	private static instance: VideoRepo;
	private readonly pathname = "/collections/public/youtube";

	public static getInstance(): VideoRepo {
		if (!VideoRepo.instance) {
			VideoRepo.instance = new VideoRepo();
		}
		return VideoRepo.instance;
	}

	constructor() {
		super();
	}

	async getAll(filter: VideoFilter) {
		return this.getClientOrServer().get<BaseCollectionJson<VideoJson>>(
			this.pathname,
			{
				params: Helper.convertParams(filter),
				cache: "force-cache",
				next: {
					revalidate: CACHE_TIME,
				},
			}
		);
	}

	async getOne(id: number | string) {
		return this.getClientOrServer().get<VideoJson>(this.pathname + "/" + id, {
			cache: "force-cache",
			next: {
				revalidate: CACHE_TIME,
			},
		});
	}
}

export default VideoRepo;
