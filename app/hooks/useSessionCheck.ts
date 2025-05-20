import { useEffect } from "react";
import { useRouter } from "next/navigation";

type SessionCheckOptions = {
  key: string;
  redirectTo: string;
};

export const useSessionCheck = ({ key, redirectTo }: SessionCheckOptions) => {
  const router = useRouter();

  useEffect(() => {
    const sessionValue = sessionStorage.getItem(key);
    if (!sessionValue) {
      router.replace(redirectTo);
    }
  }, [key, redirectTo, router]);
};
