import { ProductDetail, ProductQuestionPayload } from "@/app/types/product";
import {
  AnswerQuestionPayload,
  PolicePayload,
  RootObject,
  SoruListItem,
} from "@/app/types/question";
import { post } from ".";
import { Paths } from "@/app/types/constants";

export async function fetchProductQuestions(
  policeGuid: string,
  productDetail: ProductDetail
): Promise<SoruListItem[]> {
  const { SORU_LIST } = await post<ProductQuestionPayload, RootObject>({
    path: Paths.SetTeklifUrun,
    payload: {
      POLICE_GUID: policeGuid,
      URUN_LIST: [
        {
          VISIBLE: 1,
          URUN_ID: productDetail?.URUN_ID,
          URUN_AD: productDetail?.URUN_AD,
          URUN_KOD: productDetail?.URUN_KOD,
        },
      ],
    },
  });
  return SORU_LIST.filter((item) => item.GIZLI !== "E" || item.SORU_ID == 83);
}

export async function submitQuestionAnswer(
  policeGuid: string,
  question: SoruListItem,
  value: string | number
): Promise<SoruListItem[]> {
  const { SORU_LIST } = await post<AnswerQuestionPayload, RootObject>({
    path: Paths.PostPolicyQuestionAnswer,
    payload: {
      POLICE_GUID: policeGuid,
      SORU_LIST: [{ ...question, DEGER_KOD: value }],
    },
  });
  return SORU_LIST.filter((item) => item.GIZLI !== "E" || item.SORU_ID == 83);
}

export async function submitForm(policeGuid: string): Promise<string> {
  const { POLICE_GUID } = await post<PolicePayload, { POLICE_GUID: string }>({
    path: Paths.PostPolicyQuestion,
    payload: {
      POLICE_GUID: policeGuid,
    },
  });
  return POLICE_GUID;
}
