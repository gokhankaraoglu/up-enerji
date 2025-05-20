import { useEffect } from "react";
import { post } from "../utils/api";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../utils/api/axiosClient";
import { createExpirationDate } from "../utils";
import { Paths } from "../types/constants";

export const getToken = async () => {
  const accessToken = Cookies.get(ACCESS_TOKEN);

  if (!accessToken) {
    try {
      const { accessToken } = await post<unknown, never>({
        path: Paths.GetToken,
        payload: {
          userName: process.env.NEXT_PUBLIC_USERNAME,
          password: process.env.NEXT_PUBLIC_PASSWORD,
        },
      });

      const expirationDate = createExpirationDate(12);
      Cookies.set(ACCESS_TOKEN, accessToken, { expires: expirationDate });
    } catch (error) {
      console.error("Failed to fetch initial token", error);
    }
  }
};

const useToken = () => {
  useEffect(() => {
    const fetchToken = async () => {
      await getToken();
    };

    fetchToken();
  }, []);
};

export default useToken;
