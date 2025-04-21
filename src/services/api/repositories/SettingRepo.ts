import { BaseCollectionJson } from "@/types/Base.type";
import BaseRepository from "./BaseRepository";
import Helper from "@/utils/helper";
import { VideoFilter, VideoJson } from "@/types/Video.type";
import { SettingFilter, SettingJson } from "@/types/Setting.type";
import server, { Config } from "@/lib/core/server";
import { AxiosConfig } from "@/lib/core/client";
import { detectLangForServer } from "@/utils/detectServer";

const DOMAIN = process.env.NEXT_PUBLIC_API_BASE_DOMAIN;
const CACHE_TIME = 60 * 60;
class SettingRepo extends BaseRepository<SettingJson<string>> {
	private static instance: SettingRepo;
	private readonly pathname = "/settings/public";

	public static getInstance(): SettingRepo {
		if (!SettingRepo.instance) {
			SettingRepo.instance = new SettingRepo();
		}
		return SettingRepo.instance;
	}

	constructor() {
		super();
	}

	// ... existing code ...
	async getAll<D>(
		keys: SettingFilter["keys"],
		config?: Partial<AxiosConfig & RequestInit>,
		isRoot?: boolean
	) {
		const langServer = !isRoot ? await detectLangForServer() : undefined;
		const params = {
			domain: DOMAIN,
			keys: keys,
			lang: langServer,
		};

		const baseConfig = {
			params: Helper.convertParams(params),
			cache: "no-cache" as const,
			next: {
				revalidate: CACHE_TIME,
			},
		};

		return this.getClientOrServer().get<BaseCollectionJson<SettingJson<D>>>(
			this.pathname,
			{ ...baseConfig, ...config }
		);
	}
	// ... existing code ...

	async getOne<D>(id: string, config?: Partial<AxiosConfig & RequestInit>) {
		const baseConfig = {
			cache: "no-cache" as const,
			next: {
				revalidate: CACHE_TIME,
			},
		};

		return this.getClientOrServer().get<SettingJson<D>>(
			this.pathname + "/" + id,
			{ ...baseConfig, ...config }
		);
	}
}

export default SettingRepo;
