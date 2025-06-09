export interface PersonalFormElements {
  TCK: string;
  DGMTAR: string;
  CEPTEL: string;
  EMAIL: string;
  PLK: string;
  ARCKULTIP: string;
  [key: string]: string;
}

export interface CorporateFormElements {
  VKN: string;
  CEPTEL: string;
  EMAIL: string;
  PLK: string;
  [key: string]: string;
}

export interface Credentials {
  [key: string]: string;
}
