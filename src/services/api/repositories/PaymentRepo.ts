import {
	CreateTransactionVNpayJson,
	CreateTransactionVNpayProps,
	CheckVnpayResponse,
} from "@/types/Payment.type";

import BaseRepository from "./BaseRepository";

class PaymentRepo extends BaseRepository {
	private readonly URLS = {
		TRANSACTION_VNP: "/vnpaygateways",
	};

	async createTransactionVNpay(data: CreateTransactionVNpayProps) {
		return this.getClientOrServer().post<CreateTransactionVNpayJson>(
			this.URLS.TRANSACTION_VNP + "/create",
			data
		);
	}

	async checkTransactionVNpay(data: { [key: string]: string }) {
		return this.getClientOrServer().get<CheckVnpayResponse>(
			this.URLS.TRANSACTION_VNP + "/return",
			{
				params: data,
			}
		);
	}
}

export default PaymentRepo;
