import { postWithCustomBase } from ".";

export interface PaymentRequestDto {
  uniqueId: string;
  policyGuid: string;
  description?: string;
}

export async function submitPaymentDetails(
  paymentPayload: PaymentRequestDto
): Promise<any> {
  const response = await postWithCustomBase<PaymentRequestDto, any>(
    "/payment",
    process.env.NEXT_PUBLIC_FINSURETEXT_API_URL ?? "",
    paymentPayload
  );
  return response;
}
