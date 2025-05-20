import { ApiResponse } from "@/app/types";
import { post } from ".";
import { PaymentData, TransactionData } from "@/app/types/payment";
import { Paths } from "@/app/types/constants";

export interface PolicyApprovalBeforePayload {
  ENTEGRASYON_POLICE_HAREKET_ID: number;
  TAKSIT_KOD: string | null;
  CALLBACK_URL: string | null;
}

export interface PolicyApprovalAfterPayload {
  ENTEGRASYON_POLICE_HAREKET_ID: number;
  TRANSACTION_ID: string;
  ACIKLAMA: string | null;
  TRANSACTION_LOG: string | null;
}

export async function submitPolicyApprovalSecurePayment(
  hareketId: number,
  taksitKod: string | null = null,
  callbackUrl: string | null = null
): Promise<TransactionData> {
  const response = await post<
    PolicyApprovalBeforePayload,
    ApiResponse<TransactionData>
  >({
    path: Paths.PolicyApprovalSecurePaymentBefore,
    payload: {
      ENTEGRASYON_POLICE_HAREKET_ID: hareketId,
      TAKSIT_KOD: taksitKod,
      CALLBACK_URL: callbackUrl,
    },
  });
  return response?.Data;
}

export async function submitPolicyApprovalSecurePaymentAfter(
  hareketId: number,
  transactionId: string,
  description: string | null = null,
  transactionLog: string | null = null
): Promise<PaymentData> {
  const response = await post<
    PolicyApprovalAfterPayload,
    ApiResponse<PaymentData>
  >({
    path: Paths.PolicyApprovalSecurePaymentAfter,
    payload: {
      ENTEGRASYON_POLICE_HAREKET_ID: hareketId,
      TRANSACTION_ID: transactionId,
      ACIKLAMA: description,
      TRANSACTION_LOG: transactionLog,
    },
  });
  return response?.Data;
}
