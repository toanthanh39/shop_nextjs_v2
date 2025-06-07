import client from "@/lib/core/client";
import server from "@/lib/core/server";
import {
	CreateTransactionVNpayJson,
	CreateTransactionVNpayProps,
	CheckVnpayResponse,
} from "@/types/Payment.type";

class PaymentRepo {
	private readonly URLS = {
		TRANSACTION_VNP: "/vnpaygateways",
	};

	async createTransactionVNpay(data: CreateTransactionVNpayProps) {
		return client.post<CreateTransactionVNpayJson>(
			this.URLS.TRANSACTION_VNP + "/create",
			data
		);
	}

	async checkTransactionVNpay(data: { [key: string]: string }) {
		return server.get<CheckVnpayResponse>(
			this.URLS.TRANSACTION_VNP + "/return",
			{
				params: data,
			}
		);
	}
}

export default PaymentRepo;
