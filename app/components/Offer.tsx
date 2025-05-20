import Cookies from "js-cookie";
import { useState } from "react";

import Image from "next/image";
import { createExpirationDate, formatName } from "../utils";
import { submitPolicyApprovalSecurePayment } from "../utils/api/payment";
import { StoredPoliceItem } from "../types/product";
import { GUID } from "../hooks/useSetGuid";
import { useRouter } from "next/navigation";
import InformationFormDialog from "../dialogs/InformationFormDialog";

interface OfferProps
  extends Omit<StoredPoliceItem, "entegrationPoliceNo" | "entegrationKey"> {
  setIsProcessing?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Offer({
  title,
  company,
  price,
  startDate,
  endDate,
  brand,
  model,
  deviceValue,
  entegrationId,
  setIsProcessing,
}: OfferProps) {
  const router = useRouter();
  const [showInformationForm, setShowInformationForm] = useState(false);
  const [isAcceptedForm, setIsAcceptedForm] = useState(false);

  async function handleSendForm(event: React.FormEvent) {
    event.preventDefault();

    const expirationDate = createExpirationDate(6);
    if (setIsProcessing) {
      setIsProcessing(true);
    }
    const locationUrl = window.location.href;
    const baseURL = new URL(locationUrl).origin;

    const { REDIRECT_URL, TRANSACTION_ID: transactionId } =
      await submitPolicyApprovalSecurePayment(
        entegrationId,
        null,
        `${baseURL}/odeme/geri-donus`
      );
    const policeGuid: string | undefined = Cookies.get(GUID);
    if (!policeGuid) {
      router.push("/teklif-form");
      return;
    }

    if (REDIRECT_URL) {
      const payloadValue = [entegrationId, transactionId, REDIRECT_URL];
      const payloadValueJSON = JSON.stringify(payloadValue);
      Cookies.set(policeGuid, payloadValueJSON, { expires: expirationDate });
      window.location.href = REDIRECT_URL;
    }
  }

  return (
    <>
      <div className="rounded-xl max-w-[405px] w-full bg-white p-4 border-solid border-[1px] border-[#0F1827] ">
        <div className="mb-2.5 flex">
          <Image src="/axa-logo.png" alt="Axa logo" width="40" height="40" />
          <div className="ml-2.5 w-full">
            <div className="flex justify-between text-[#0F1827] text-sm font-medium align-middle md:align-top">
              <p>{formatName(title) ?? "-"}</p>
              <p>₺{price ?? "-"}</p>
            </div>
            <p className="flex text-xs font-extralight text-[#667085]">
              {formatName(company)} güvencesiyle
            </p>
          </div>
        </div>
        <hr className="my-2 border-t-1 border-[#667085]" />
        <div className="text-sm text-[#0F1827]">
          {/* <div>
            <p className="font-light text-xs text-[#667085]">Sigortalı</p>
            <p className="text-sm font-normal ">{brand ?? "-"}</p>
          </div>
          <hr className="my-2 border-t-1 border-[#667085]" /> */}
          <div>
            <p className="font-light text-xs text-[#667085]">Cihaz Bilgileri</p>
            <p className="text-sm font-normal">{`${formatName(brand ?? "-")} ${
              formatName(model) ?? "-"
            }`}</p>
          </div>
          <hr className="my-2 border-t-1 border-[#667085]" />
          <div>
            <p className="font-light text-xs text-[#667085]">Cihaz Bedeli</p>
            <p className="text-sm font-normal">₺{deviceValue ?? " -"}</p>
          </div>
          <hr className="my-2 border-t-1 border-[#667085]" />
          <div>
            <p className="font-light text-xs text-[#667085]">
              Poliçe Başlangıç ve Bitiş Tarihi
            </p>
            <p className="text-sm font-normal">
              {startDate} - {endDate}
            </p>
          </div>
        </div>
        <form id="form2" onSubmit={handleSendForm} className="mt-2.5">
          <div className="flex items-center mb-1.5">
            <input
              className="cursor-pointer"
              type="checkbox"
              id="declaration"
              required
            />
            <label
              htmlFor="declaration"
              className="ml-2 text-xs font-extralight text-[#667085] cursor-pointer"
            >
              Ödeme adımına geçmek için hasarsızlık beyanını kabul ediniz.
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="cursor-pointer"
              required
              checked={isAcceptedForm}
              onChange={() => setIsAcceptedForm((prev) => !prev)}
            />
            <label className="ml-2 text-xs font-extralight text-[#667085]">
              <span
                className="cursor-pointer"
                onClick={() => setIsAcceptedForm((prev) => !prev)}
              >
                Ödeme adımına geçmek için{" "}
              </span>
              <span
                className="text-[#6941C6] underline cursor-pointer"
                onClick={() => {
                  setShowInformationForm(true);
                }}
              >
                Sigorta Bilgilendirme Formunu
              </span>{" "}
              <span
                className="cursor-pointer"
                onClick={() => setIsAcceptedForm((prev) => !prev)}
              >
                kabul ediniz.
              </span>
            </label>
          </div>
        </form>
      </div>
      <InformationFormDialog
        isOpen={showInformationForm}
        close={() => {
          setShowInformationForm(false);
        }}
        confirm={() => {
          setIsAcceptedForm(true);
          setShowInformationForm(false);
        }}
      />
    </>
  );
}

export default Offer;
