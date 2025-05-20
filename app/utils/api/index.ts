import { QueryKey } from "@tanstack/react-query";
import { axiosClient } from "./axiosClient";

interface BaseRequest {
  path: string;
}

interface RequestWithPayload<P> extends BaseRequest {
  payload: P;
}

export interface UpdatePayload<P> {
  id: number | string;
  updates: Partial<P>;
  additionalInvalidates?: QueryKey[];
}

// P = payload, R = ResponseType
export async function post<P, R>({
  path,
  payload,
}: RequestWithPayload<P>): Promise<R> {
  const { data } = await axiosClient.post<R>(`${path}`, payload);
  return data;
}
