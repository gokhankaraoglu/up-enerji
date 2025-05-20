export interface Item {
  FILE_NAME: string;
  BINARY_DATA: string;
  FILE_URL: string;
  CONTENT_TYPE: string;
  EVRAK_HAVUZ_ID: number;
  Success: boolean;
  ErrorList: string[];
  WarningList: string[];
  MessageList: string[];
}

export interface DocumentData {
  Items: Item[];
  Success: boolean;
  ErrorList: string[];
  WarningList: string[];
  MessageList: string[];
}
