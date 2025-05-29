export interface SoruDeger {
  SORU_DEGER_ID: number;
  SORU_ID: number;
  DEGER_KOD: string;
  DEGER_AD: string;
  MIN_DEGER: unknown;
  MAX_DEGER: unknown;
  DEFAULT_DEGER: unknown;
  REF_SORU_ID: unknown;
  REF_SORU_DEGER_ID: unknown;
  GUNCELLEYEN: string;
  GUNCELLEME_TARIH: string;
  GUNCELLEME_TARIH_NUM: number;
}

export interface SoruListItem {
  DEGISIM_SAYISI: number;
  DEGER_KOD: string | number;
  DEGER_AD: string | null;
  TABLOSU_VAR: number;
  SIRA_NO: number;
  ZORUNLU: string;
  GIZLI: string;
  URUN_SORU_EVENT: unknown;
  KONTROL_GRUP_ID: unknown;
  KONTROL_GRUP_AD: unknown;
  KONTROL_GRUP_MESAJ: unknown;
  DIZAYN_GRUP: string;
  ENTEGRASYON_URUN_ID_LIST: unknown;
  SGR_SIRKET_MUSTERI_ROL_ID: unknown;
  SORU_DEGER_LIST: SoruDeger[];
  SORU_ID: number;
  SORU_TIP_ID: number;
  SORU_KOD: string;
  SORU_AD: string;
  MASKE_TIP_ID: number;
  SIRALAMA_TIP: unknown;
  GUNCELLEYEN: unknown;
  GUNCELLEME_TARIH: unknown;
  GUNCELLEME_TARIH_NUM: unknown;
  VALUE: string;
}

export interface RootObject {
  POLICE_ID: unknown;
  POLICE_KEY: unknown;
  POLICE_GUID: string;
  POLICE_PARTAJ_GUID: unknown;
  SGR_MUSTERI_ROL_ID: unknown;
  SGR_MUSTERI_ROL_AD: unknown;
  SGE_MUSTERI_ROL_ID: unknown;
  SGE_MUSTERI_ROL_AD: unknown;
  MT_MUSTERI_ROL_ID: unknown;
  MT_MUSTERI_ROL_AD: unknown;
  TP_MUSTERI_ROL_ID: unknown;
  TP_MUSTERI_ROL_AD: unknown;
  IS_ATAMA: unknown;
  KIMLIK_BILGI: unknown;
  URUN_LIST: unknown[];
  SORU_LIST: SoruListItem[];
  SORU_MASKE_LIST: MaskType[];
}

export interface MaskType {
  MASKE_TIP_ID: number;
  OPTIONS: string;
  MASKE_TIP_AD: string;
  PLACEHOLDER: string | null;
  MASKE_EVENT_ID: number | null;
  MASKE_EVENT_AD: string | null;
  EVENT_NAME: string | null;
  PARAMETERS: string | null;
  SCRIPT_CODE: string | null;
}

export interface PolicePayload {
  POLICE_GUID: string;
}

export interface AnswerQuestionPayload extends PolicePayload {
  SORU_LIST: SoruListItem[];
}

export interface PostPolicyQuestionResponse {
  POLICE_ID: number;
  POLICE_KEY: string;
  POLICE_GUID: string;
  POLICE_PARTAJ_GUID: string;
  SGR_MUSTERI_ROL_ID: number | null;
  SGR_MUSTERI_ROL_AD: string | null;
  SGE_MUSTERI_ROL_ID: number | null;
  SGE_MUSTERI_ROL_AD: string | null;
  MT_MUSTERI_ROL_ID: number | null;
  MT_MUSTERI_ROL_AD: string | null;
  TP_MUSTERI_ROL_ID: number | null;
  TP_MUSTERI_ROL_AD: string | null;
  IS_ATAMA: unknown;
  KIMLIK_BILGI: unknown;
  URUN_LIST: unknown[];
  SORU_LIST: unknown[];
  URUN_SORU_EVENT_LIST: unknown[];
  SORU_MASKE_LIST: unknown[];
  SORU_TABLO_LIST: unknown[];
  ENTEGRASYON_POLICE: unknown[];
  ENTEGRASYON_PARTAJ: unknown[];
  BAGLI_MUSTERI: unknown[];
  MASKED_SORU_LIST: MaskType[];
  is_mobile: boolean;
  IS_OTO_TEKLIF: boolean;
  Success: boolean;
  ErrorList: unknown[];
  WarningList: unknown[];
  MessageList: unknown[];
}

export interface GetEntegrasyonPolicePayload {
  POLICE_GUID: string;
}
