export interface VNPayPaymentRequest {
  orderId: string;
  amount: number;
  orderDescription: string;
  returnUrl: string;
  ipAddress: string;
}

export interface VNPayPaymentResponse {
  paymentUrl: string;
  vnpTxnRef: string;
}

export interface VNPayCallback {
  vnp_Amount: string;
  vnp_BankCode: string;
  vnp_BankTranNo: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_PayDate: string;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo: string;
  vnp_TransactionStatus: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
}