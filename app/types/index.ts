export interface DataItem {
  URUN_ID: number;
  URUN_KOD: string;
  URUN_AD: string;
  GUNCELLEYEN: string;
  GUNCELLEME_TARIH: string;
  GUNCELLEME_TARIH_NUM: number;
}

export interface Data {
  Items: DataItem[];
  Success: boolean;
  ErrorList: unknown[];
  WarningList: unknown[];
  MessageList: unknown[];
}

export interface ApiResponse<T> {
  Data: T;
  Message: string | null;
  Status: number;
}

export interface IWalletData {
  status: string;
  data: {
    police_guid: string;
  };
}

declare global {
  interface Window {
    OnLoadEvent?: {
      postMessage: (iwalletData: IWalletData) => void;
    };
  }
}

export type User = {
  taxNumber: string;
  identityNumber: string;
  birthDate: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  returnCode: number;
  returnMessage: string;
  exceptionMessage: string;
};

export type Credentials = {
  TCK: string;
  DGMTAR: string;
  CEPTEL: string;
  EMAIL: string;
  VKN: string;
};
