import { BaseCollectionJson, IBaseRepository } from "@/types/Base.type";
import { CashflowCreate, CashflowJson } from "@/types/Cashflow.type";

import Helper from "@/utils/helper";

import BaseRepository from "./BaseRepository";

class CashflowRepo
	extends BaseRepository
	implements IBaseRepository<CashflowJson>
{
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
		return this.getClientOrServer().get<BaseCollectionJson<CashflowJson>>(
			this.pathname,
			{
				params: Helper.convertParams(f),
			}
		);
	}

	async getOne(id: number | string): Promise<CashflowJson> {
		return this.getClientOrServer().get<CashflowJson>(this.pathname + "/" + id);
	}

	async create(data: CashflowCreate): Promise<CashflowJson> {
		return this.getClientOrServer().post<CashflowJson>(this.pathname, data);
	}
}

export default CashflowRepo;
