import { CashflowreceiptsMethod } from "@/types/Cashflow.type";
import { PaymentMethod } from "@/types/Payment.type";

class CashflowConvert {
	/**
	 * Chuyển đổi giá trị phương thức thanh toán -> number
	 * @param method Giá trị phương thức thanh toán (string)
	 * @returns Giá trị số đại diện phương thức thanh toán dưới hệ thống
	 */
	static convertOrderMethodToCashflowMethod(method: PaymentMethod) {
		switch (method) {
			case "cash":
				return CashflowreceiptsMethod.CASH;
			case "vnpay":
				return CashflowreceiptsMethod.VNPAY;
			case "card":
				return CashflowreceiptsMethod.CARD;
			case "cod":
				return CashflowreceiptsMethod.COD;
			case "transfer":
				return CashflowreceiptsMethod.TRASNFER;
			case "voucher":
				return CashflowreceiptsMethod.VOUCHER;
			default:
				return CashflowreceiptsMethod.CASH;
		}
	}
}

export default CashflowConvert;
