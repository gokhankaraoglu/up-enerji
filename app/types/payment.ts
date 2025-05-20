export interface TransactionData {
  ENTEGRASYON_POLICE_HAREKET_ID: number;
  REDIRECT_URL: string;
  TRANSACTION_ID: string;
  LOCAL_TRANSACTION_ID: string;
  PROVIDER_PROCCESS_ID: string;
  Success: boolean;
  ErrorList: string[];
  WarningList: string[];
  MessageList: string[];
}

export interface PaymentData {
  Success: boolean;
  ErrorList: string[];
  WarningList: string[];
  MessageList: string[];
}
