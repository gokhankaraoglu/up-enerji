import { post } from ".";
import { ApiResponse } from "@/app/types";
import { Paths } from "@/app/types/constants";
import { DocumentData } from "@/app/types/document";

export async function getPolicyDocument(
  entegrasyonPoliceHarekedKey: string
): Promise<DocumentData> {
  const response = await post<
    { ENTEGRASYON_POLICE_HAREKET_KEY: string },
    ApiResponse<DocumentData>
  >({
    path: Paths.GetPolicyDocumentWithKey,
    payload: {
      ENTEGRASYON_POLICE_HAREKET_KEY: entegrasyonPoliceHarekedKey,
    },
  });
  return response.Data;
}
