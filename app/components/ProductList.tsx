"use client";
import { setSessionStorage } from "../utils";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../loading";
import { useEffect } from "react";

function ProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const URUN_AD = searchParams.get("URUN_AD");
    const URUN_KOD = searchParams.get("URUN_KOD");
    const URUN_ID = searchParams.get("URUN_ID");
    const uniqueId = searchParams.get("uniqueId");
    setSessionStorage("uniqueId", uniqueId);

    if (URUN_AD && URUN_KOD && URUN_ID) {
      setSessionStorage("product", {
        URUN_AD,
        URUN_KOD,
        URUN_ID,
      });
    } else {
      setSessionStorage("product", {
        URUN_ID: 11,
        URUN_KOD: "KSK",
        URUN_AD: "KASKO SİGORTASI",
      });
    }
    router.push(`/teklif-form`);
  }, []);

  return <Loading />;
}

export default ProductList;
