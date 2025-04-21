import { CashflowCreate, CashflowJson } from "@/types/Cashflow.type";
import BaseRepository from "./BaseRepository";
import { BaseCollectionJson } from "@/types/Base.type";
import client from "@/lib/core/client";
import Helper from "@/utils/helper";

class CashflowRepo extends BaseRepository<CashflowJson> {
	private readonly pathname = "/cashflowreceipts/public/order";
	private static instance: CashflowRepo;

	public static getInstance(): CashflowRepo {
		if (!CashflowRepo.instance) {
			CashflowRepo.instance = new CashflowRepo();
		}
		return CashflowRepo.instance;
	}

	constructor() {
		super();
	}

	async getAll(f: unknown): Promise<BaseCollectionJson<CashflowJson>> {
		return client.get<BaseCollectionJson<CashflowJson>>(this.pathname, {
			params: Helper.convertParams(f),
		});
	}

	async getOne(id: number | string): Promise<CashflowJson> {
		return client.get<CashflowJson>(this.pathname + "/" + id);
	}

	async create(data: CashflowCreate): Promise<CashflowJson> {
		return client.post<CashflowJson>(this.pathname, data);
	}
}

export default CashflowRepo;
