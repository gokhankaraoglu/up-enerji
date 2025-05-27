interface ApiResponse {
  Data: Data;
  Message: string | null;
  Status: number;
}
export interface ProductItem {
  URUN_ID: number;
  URUN_KOD: string;
  URUN_AD: string;
  GUNCELLEYEN: string;
  GUNCELLEME_TARIH: string;
  GUNCELLEME_TARIH_NUM: number;
}

export interface Data {
  Items: (ProductItem | PoliceItem)[];
  Success: boolean;
  ErrorList: unknown[];
  WarningList: unknown[];
  MessageList: unknown[];
}

export type ProductApiResponse = ApiResponse;

export interface ProductDetail {
  VISIBLE: 1;
  URUN_AD: string;
  URUN_ID: number;
  URUN_KOD: string;
}

export interface ProductQuestionPayload {
  POLICE_GUID: string;
  URUN_LIST: ProductDetail[];
}

export type PoliceApiResponse = ApiResponse;

export interface PoliceItem {
  ONLINE: string;
  ESKI_HAREKET_ID: number | null;
  TAHSILAT_TIP_ID: number;
  SECIM: unknown | null;
  IS_ATAMA_ID: unknown | null;
  URUN_ID: number;
  URUN_KOD: string;
  ENTEGRASYON_ID: number;
  ENTEGRASYON_KOD: string;
  ENTEGRASYON_URUN_KOD: string;
  ENTEGRASYON_URUN_AD: string;
  URUN_AD: string;
  SIRKET_URUN_KOD: unknown | null;
  SGR_SIRKET_MUSTERI_ROL_ID: number;
  SGR_SIRKET_MUSTERI_ROL_AD: string;
  SGR_MUSTERI_ROL_ID: unknown | null;
  SGR_MUSTERI_ROL_AD: unknown | null;
  SGE_MUSTERI_ROL_ID: unknown | null;
  SGE_MUSTERI_ROL_AD: unknown | null;
  MT_MUSTERI_ROL_ID: unknown | null;
  MT_MUSTERI_ROL_AD: unknown | null;
  TP_MUSTERI_ROL_ID: unknown | null;
  TP_MUSTERI_ROL_AD: unknown | null;
  ENTEGRASYON_POLICE_HAREKET_ID: number;
  ENTEGRASYON_POLICE_HAREKET_KEY: string | null;
  ENTEGRASYON_POLICE_LOG_ID: unknown | null;
  REVIZE_NO: number;
  ENTEGRASYON_POLICE_NO: string | null;
  ENTEGRASYON_ZEYL_NO: unknown | null;
  ENTEGRASYON_YENILEME_NO: unknown | null;
  ENTEGRASYON_POLICE_DURUM_ID: number;
  ENTEGRASYON_POLICE_DURUM_AD: string;
  ACENTE_NO: unknown | null;
  TALI_ACENTE_NO: unknown | null;
  ZEYL_KOD: unknown | null;
  ZEYL_AD: unknown | null;
  SASI_NO: unknown | null;
  T_I: unknown | null;
  SIRKET_SON_DURUM: unknown | null;
  MT: unknown | null;
  TOPLAM_PRIM: unknown | null;
  TOPLAM_PRIM_TL: number;
  TOPLAM_NET_PRIM: unknown | null;
  TOPLAM_NET_PRIM_TL: unknown | null;
  TOPLAM_VERGI: unknown | null;
  TOPLAM_VERGI_TL: unknown | null;
  TOPLAM_KOMISYON: unknown | null;
  TOPLAM_KOMISYON_TL: unknown | null;
  DOVIZ_ID: unknown | null;
  DOVIZ_KUR: unknown | null;
  DOVIZ_KOD: unknown | null;
  DOVIZ_AD: unknown | null;
  MARKA_AD: string;
  CIHAZ_BEDEL: number;
  MARKA_TIP_AD: string;
  DURUM_ACIKLAMA: string;
  POLICE_PARTAJ_GUID: string;
  TAKSIT: unknown | null;
  BASLAMA_TARIH: unknown | null;
  BITIS_TARIH: unknown | null;
  TANZIM_TARIH: string;
  ESKI_SGR_SIRKET_MUSTERI_ROL_ID: unknown | null;
  ESKI_SGR_SIRKET_MUSTERI_ROL_AD: unknown | null;
  ESKI_POLICE_NO: unknown | null;
  POLICE_IS_TIP: unknown | null;
  SECURE_PAYMENT_REF_NO: unknown | null;
  PLCBRT_ISLEM_REFERANS_ID: unknown | null;
  PLCKOM_ISLEM_REFERANS_ID: unknown | null;
  ALT_GRUP_KOD: unknown | null;
  ALT_GRUP_AD: unknown | null;
  TEKLIF_GECERLILIK_TARIH: unknown | null;
  TEKLIF_GECERLILIK_SURE: number;
  HATA_GRUP: unknown | null;
  SGR_TCK_NO: unknown | null;
  SGR_VK_NO: unknown | null;
  ENTEGRASYON_POLICE_ID: number;
  SON_HAREKET_ID: number;
  POLICE_ID: number;
  POLICE_GUID: string;
  ENTEGRASYON_URUN_ID: number;
  GUNCELLEYEN: string;
  GUNCELLEME_TARIH: string;
  GUNCELLEME_TARIH_NUM: number;
  Success: boolean;
  ErrorList: unknown[];
  WarningList: unknown[];
  MessageList: unknown[];
}

export interface StoredPoliceItem {
  startDate: string;
  endDate: string;
  company: string;
  price: number;
  title: string;
  entegrationId: number;
  entegrationKey: string;
  entegrationPoliceNo: string;
}

export enum EntegrasyonPoliceDurumID {
  BEKLIYOR = 1,
  TEKLIF = 2,
  POLICE = 3,
  HATA = 4,
}
