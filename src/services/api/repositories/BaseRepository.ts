import client from "@/lib/core/client";
import server from "@/lib/core/server";
import { BaseCollectionJson } from "@/types/Base.type";

abstract class BaseRepository<T> {
	protected readonly BASE_URL_V1: string =
		process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
	protected readonly BASE_URL_V2: string =
		process.env.NEXT_PUBLIC_API_BASE_URL_V2 ?? "";

	constructor() {
		if (!this.BASE_URL_V1 || !this.BASE_URL_V2) {
			throw new Error("Base URLs must be provided");
		}
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
		return typeof window === "undefined" ? server : client;
	}
}

export default BaseRepository;
