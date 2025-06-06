import client from "@/lib/core/client";
import { BaseCollectionJson, BaseRepoParams } from "@/types/Base.type";
import { CartCreate } from "@/types/Cart.type";
import {
	CashflowGroup,
	CashflowreceiptsDirection,
	CashflowreceiptSource,
	CashflowreceiptsStatus,
	CashflowreceiptTarget,
} from "@/types/Cashflow.type";
import {
	OrderAddCoupon,
	OrderAddEdit,
	OrderFilter,
	OrderJson,
} from "@/types/Order.type";
import {
	PaymentAccessMode,
	PaymentAddJson,
	PaymentAddJsonPrivate,
	PaymentAddJsonPublic,
	PaymentCheckoutJson,
	PaymentJson,
} from "@/types/Payment.type";

import CashflowConvert from "@/services/utils/CashflowConvert";
import Helper from "@/utils/helper";

import BaseRepository from "./BaseRepository";
import CashflowRepo from "./CashflowRepo";
import CustomerRepo from "./CustomerRepo";
import OrderRepo from "./OrderRepo";
import PaymentRepo from "./PaymentRepo";

class CartRepo extends BaseRepository<OrderJson> implements BaseRepoParams {
	private static instance: CartRepo;
	private readonly URLS = {
		PUBLIC: "/orders/cart/public",
		PRIVATE: "/orders/cart/mycart",
	};

	accessMode: BaseRepoParams["accessMode"];
	public getInstance(params: BaseRepoParams): CartRepo {
		if (!CartRepo.instance) {
			CartRepo.instance = new CartRepo(params);
		} else {
			CartRepo.instance.accessMode = params.accessMode;
		}
		return CartRepo.instance;
	}

	constructor(params: BaseRepoParams) {
		super();
		this.accessMode = params.accessMode;
	}

	private getCorrectURL(suffix = "") {
		switch (this.accessMode) {
			case "PUBLIC":
				return this.URLS.PUBLIC + suffix;

			default:
				return this.URLS.PRIVATE + suffix;
		}
	}

	async getOne(
		id: number | string,
		filter: Pick<OrderFilter, "customer_token">
	) {
		const clientOrServer = this.getClientOrServer();
		const url = this.getCorrectURL(`/${id}`);
		return clientOrServer.get<OrderJson>(url, {
			params: Helper.convertParams(filter),
		});
	}

	async getAll(filter: OrderFilter) {
		const clientOrServer = this.getClientOrServer();
		const url = this.getCorrectURL("/mycart");
		return clientOrServer.get<BaseCollectionJson<OrderJson>>(url, {
			params: Helper.convertParams(filter),
		});
	}

	async update(data: OrderAddEdit) {
		const url = this.getCorrectURL(`/update/${data.cart_id}`);
		return client.put<OrderJson>(url, data);
	}

	async create(data: CartCreate) {
		const url = this.getCorrectURL("/add");
		return client.post<OrderJson>(url, data);
	}

	async delete(id: number | string) {
		const url = this.getCorrectURL(`/delete/${id}`);
		return client.put<OrderJson>(url);
	}

	async addCoupon(data: OrderAddCoupon) {
		const url = this.getCorrectURL(`/coupon/${data.order_id}`);
		return client.put<OrderJson>(url, data);
	}

	async checkout(data: PaymentAddJson) {
		switch (data.access_mode) {
			case PaymentAccessMode.PRIVATE:
				return this.checkoutPrivateCart(data.data);

			default:
				return this.checkoutPublicCart(data.data);
		}
	}

	// User public methods
	private async checkoutPublicCart(data: PaymentAddJsonPublic) {
		const newCustomer = await new CustomerRepo().quickCreate({
			phone: data.billing_phone,
			full_name: data.billing_fullname,
			address: data.billing_address,
			province: data.billing_province,
			district: data.billing_district,
			ward: data.billing_ward,
		});

		const dataPayment: PaymentCheckoutJson<PaymentAddJsonPublic> = {
			...data,
			order_id: 0,
			customer_id: newCustomer.customer_id,
		};

		const order = await new OrderRepo({
			accessMode: this.accessMode,
		}).create({
			...dataPayment,
			store_id: data.store_id,
		});

		dataPayment.order_id = order.order_id;

		const cashflowResponse = await new CashflowRepo().create({
			cashflow_group: CashflowGroup.CASHFLOW_GROUP_SALE,
			direction: CashflowreceiptsDirection.RECEIPT,
			method: CashflowConvert.convertOrderMethodToCashflowMethod(
				dataPayment.payment_method
			),
			source: CashflowreceiptSource.ORDER,
			source_id: order.order_id,
			status: CashflowreceiptsStatus.PENDING,
			store_id: data.store_id,
			target: CashflowreceiptTarget.TARGET_CASHFLOW_RECEIPT,
			target_id: dataPayment.customer_id,
			value: order.debt,
		});

		const responsePayment = await client.put<PaymentJson>(
			`${this.URLS.PUBLIC}/pay/${order.id}`,
			dataPayment
		);

		if (dataPayment.payment_method === "vnpay") {
			const reponseTransVnpay = await new PaymentRepo().createTransactionVNpay({
				cashflow_receipt_id: cashflowResponse.id,
				order_id: order.id,
				return_url: location.origin + "/checkouts/vnpay",
			});

			responsePayment.url_payment = reponseTransVnpay.payment_url;
		}

		return responsePayment;
	}

	// User private methods
	private async checkoutPrivateCart(data: PaymentAddJsonPrivate) {
		return client.put<PaymentJson>(`${this.URLS.PRIVATE}/checkout`, data);
	}
}

export default CartRepo;
