import client from "@/lib/core/client";
import server from "@/lib/core/server";
import { BaseCollectionJson } from "@/types/Base.type";
import Helper from "@/utils/helper";

abstract class BaseRepository<T> {
	protected readonly BASE_URL_V1: string;
	protected readonly BASE_URL_V2: string;

	constructor() {
		this.BASE_URL_V1 = process.env.NEXT_PUBLIC_API_BASE_URL!;
		this.BASE_URL_V2 = process.env.NEXT_PUBLIC_API_BASE_URL_V2!;
	}

	protected abstract getOne(
		id: number | string,
		f?: unknown
	): Promise<T | null>;
	protected abstract getAll(
		f: unknown,
		config?: unknown
	): Promise<BaseCollectionJson<T>>;

	protected getClientOrServer() {
		return Helper.isServer() ? server : client;
	}
}

export default BaseRepository;
