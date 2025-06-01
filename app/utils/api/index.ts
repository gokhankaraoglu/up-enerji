import axios from "axios";
import { axiosClient } from "./axiosClient";

interface BaseRequest {
  path: string;
  baseURL?: string; // opsiyonel base url
}

interface RequestWithPayload<P> extends BaseRequest {
  payload: P;
}

// P = payload, R = ResponseType
export async function post<P, R>({
  path,
  payload,
}: RequestWithPayload<P>): Promise<R> {
  const { data } = await axiosClient.post<R>(`${path}`, payload);
  return data;
}

export async function getWithCustomBase<R>(
  path: string,
  baseURL: string
): Promise<R> {
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const { data } = await axios.get<R>(path, {
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
  return data;
}
