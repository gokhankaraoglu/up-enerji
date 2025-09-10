export interface TransactionData {
  integrationPolicyMovementId: number;
  redirectUrl: string;
  transactionId: string;
  localTransactionId: string;
  providerProcessId: string;
  success: boolean;
  errorList: string[];
  warningList: string[];
  messageList: string[];
}

export interface PaymentData {
  success: boolean;
  errorList: string[];
  warningList: string[];
  messageList: string[];
}
