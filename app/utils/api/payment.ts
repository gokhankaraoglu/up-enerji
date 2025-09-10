import { ApiResponse } from "@/app/types";
import { getWithCustomBase, postWithCustomBase } from ".";
import { PaymentData, TransactionData } from "@/app/types/payment";

export interface PolicyApprovalBeforePayload {
  integrationPolicyMovementId: number;
  installment: string | null;
  callbackUrl: string;
  policyGUID: string;
}

export async function submitPolicyApprovalSecurePayment(
  paymentPayload: PolicyApprovalBeforePayload
): Promise<TransactionData> {
  const response = await postWithCustomBase<
    PolicyApprovalBeforePayload,
    { data: ApiResponse<TransactionData> }
  >(
    "upenerji/payment/create",
    process.env.NEXT_PUBLIC_FINSURETEXT_API_URL ?? "",
    paymentPayload
  );
  return response?.data?.data;
}

export async function submitPolicyApprovalSecurePaymentAfter(
  policyGuid: string
): Promise<PaymentData> {
  const response = await getWithCustomBase<{ data: ApiResponse<PaymentData> }>(
    `/upenerji/payment/verify/${policyGuid}`,
    process.env.NEXT_PUBLIC_FINSURETEXT_API_URL ?? ""
  );
  return response?.data?.data;
}
