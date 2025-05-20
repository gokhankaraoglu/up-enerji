import { PoliceApiResponse, PoliceItem } from "@/app/types/product";
import { GetEntegrasyonPolicePayload } from "@/app/types/question";
import { post } from ".";
import { Paths } from "@/app/types/constants";

export async function fetchOfferData(
  policeId: string
): Promise<PoliceItem | undefined> {
  const {
    Data: { Items },
  } = await post<GetEntegrasyonPolicePayload, PoliceApiResponse>({
    path: Paths.GetEntegrasyonPoliceWithGuid,
    payload: { POLICE_GUID: policeId },
  });
  return Items[0] as PoliceItem;
}
