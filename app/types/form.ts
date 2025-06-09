export interface PersonalFormElements {
  TCK: string;
  DGMTAR: string;
  CEPTEL: string;
  EMAIL: string;
  PLK: string;
  ARCKULTIP: string;
}

export interface CorporateFormElements {
  VKN: string;
  CEPTEL: string;
  EMAIL: string;
  PLK: string;
}

export interface Credentials {
  [key: string]: string;
}
