"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { GUID } from "../hooks/useSetGuid";
import { submitPolicyApprovalSecurePaymentAfter } from "../utils/api/payment";
import PaymentFailed from "../components/PaymentFailed";
import PaymentSuccess from "../components/PaymentSuccess";
import { getSessionStorage } from "../utils";
import { StoredPoliceItem } from "../types/product";
import { submitPaymentDetails } from "../utils/api/premium";

function Payment() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<boolean | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [selectedPolice, setSelectedPolice] = useState<StoredPoliceItem | null>(
    null
  );

  useEffect(() => {
    const handlePayment = async () => {
      const policyGuid = Cookies.get(GUID);
      const selectedPolice: StoredPoliceItem | undefined =
        getSessionStorage("selected-police");
      const uniqueId = getSessionStorage<string>("uniqueId");

      if (!selectedPolice?.entegrationPoliceNo) {
        router.push("/");
        return;
      }

      if (!policyGuid) {
        router.push("/");
        return;
      }

      const payloadValueJSON = Cookies.get(policyGuid);
      if (!payloadValueJSON) {
        router.push("/");
        return;
      }

      const payloadValue = JSON.parse(payloadValueJSON);
      const [redirectUrl] = payloadValue;

      let success = false;
      try {
        const result = await submitPolicyApprovalSecurePaymentAfter(policyGuid);
        success = result?.success ?? false;
      } catch {
        success = false;
      }
      if (success) {
        submitPaymentDetails({
          uniqueId: uniqueId ?? "-",
          policyGuid,
        });
      }

      setPaymentStatus(success);
      setRedirectUrl(redirectUrl);
      setSelectedPolice(selectedPolice);
      setLoading(false);
    };

    handlePayment();
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return paymentStatus
    ? selectedPolice && (
        <PaymentSuccess
          policeNo={selectedPolice?.entegrationPoliceNo}
          entegrasyonPoliceHareketKey={selectedPolice?.entegrationKey}
        />
      )
    : redirectUrl && <PaymentFailed redirectUrl={redirectUrl} />;
}

export default Payment;
