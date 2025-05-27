import axios from "axios";
import { axiosClient } from "./axiosClient";

interface BaseRequest {
  path: string;
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

interface ApiRequestOptions {
  path: string;
  authToken?: string;
  requestData?: Record<string, any> | null;
  headers?: Record<string, string>;
  queryParams?: Record<string, any>;
}

export async function apiRequest<R>(options: ApiRequestOptions): Promise<R> {
  const {
    path,
    authToken,
    requestData = {},
    headers = {},
    queryParams,
  } = options;

  const requestHeaders = {
    "Content-Type": "application/json",
    ...headers,
    ...(authToken && { Authorization: `Basic ${authToken}` }),
  };

  const queryString = queryParams
    ? `?${new URLSearchParams(queryParams).toString()}`
    : "";

  const response = await axios.post<R>(
    `${process.env.NEXT_PUBLIC_UPENERJI_API_URL}${path}${queryString}`,
    requestData,
    { headers: requestHeaders }
  );

  return response.data;
}
