import { BaseCollectionJson } from "@/types/Base.type";
import BaseRepository from "./BaseRepository";
import Helper from "@/utils/helper";
import { SettingFilter, SettingJson } from "@/types/Setting.type";
import { AxiosConfig } from "@/lib/core/client";
import { SettingConst } from "@/common/constants/setting";
import { TimeServerJson } from "@/types/Shop.type";
import SiteServerRepo from "./SiteRepo";

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
		let langServer = undefined;

		if (!isRoot) {
			const { lang } = await new SiteServerRepo().getSiteSeting();
			langServer = lang;
		}

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

	async getTimeServer() {
		return this.getClientOrServer().get<TimeServerJson>(
			this.pathname + "/" + SettingConst.time.timesever,
			{
				cache: "no-store" as const,
			}
		);
	}
}

export default SettingRepo;
