"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createExpirationDate, formatName, getSessionStorage } from "../utils";
import { submitPolicyApprovalSecurePayment } from "../utils/api/payment";
import { StoredPoliceItem } from "../types/product";
import { GUID } from "../hooks/useSetGuid";
import { useRouter } from "next/navigation";
import InformationFormDialog from "../dialogs/InformationFormDialog";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { confirmationForm } from "../utils/validations";

interface OfferProps extends Omit<StoredPoliceItem, "entegrationKey"> {
  setIsProcessing?: React.Dispatch<React.SetStateAction<boolean>>;
  formikRef: any;
}

function Offer({
  formikRef,
  title,
  company,
  price,
  startDate,
  endDate,
  entegrationId,
  entegrationPoliceNo,
  setIsProcessing,
}: OfferProps) {
  const [userVehicle, setUserVehicle] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const vehicle: any | undefined = getSessionStorage("vehicle");
    setUserVehicle(vehicle);
  }, []);

  const [showInformationForm, setShowInformationForm] = useState(false);

  async function handleSendForm() {
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
        {userVehicle && (
          <>
            <div className="mb-3">
              <p className="mb-2">{userVehicle.plate || "-"}</p>
              <div className="flex gap-[3px] text-[#667085]">
                <span>{userVehicle.year || "-"}</span>
                <span>{userVehicle.brand || "-"}</span>
                <span>{userVehicle.model || "-"}</span>
              </div>
            </div>
            <hr className="my-2 border-t-1 border-[#667085]" />
          </>
        )}
        <div className="text-sm text-[#0F1827]">
          <div>
            <p className="font-light text-xs text-[#667085]">Poliçe No</p>
            <p className="text-sm font-normal">{entegrationPoliceNo}</p>
          </div>
          <hr className="my-2 border-t-1 border-[#667085]" />
          <div>
            <p className="font-light text-xs text-[#667085]">Ürün Adı</p>
            <p className="text-sm font-normal">{formatName(title)}</p>
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
        <Formik
          innerRef={formikRef}
          initialValues={{
            declaration: false,
            informationForm: false,
          }}
          validationSchema={confirmationForm}
          onSubmit={() => {
            handleSendForm();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="mt-2.5">
              <div className="flex flex-col items-start mb-1.5">
                <div className="flex">
                  <Field
                    type="checkbox"
                    id="declaration"
                    name="declaration"
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor="declaration"
                    className="ml-2 text-xs font-extralight text-[#667085] cursor-pointer"
                  >
                    Ödeme adımına geçmek için hasarsızlık beyanını kabul ediniz.
                  </label>
                </div>
                <ErrorMessage
                  name="declaration"
                  component="div"
                  className="text-red-500 text-xs ml-6"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex">
                  <Field
                    type="checkbox"
                    id="informationForm"
                    name="informationForm"
                    className="cursor-pointer"
                  />
                  <label className="ml-2 text-xs font-extralight text-[#667085]">
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        setFieldValue(
                          "informationForm",
                          !values.informationForm
                        )
                      }
                    >
                      Ödeme adımına geçmek için{" "}
                    </span>
                    <span
                      className="text-[#6941C6] underline cursor-pointer"
                      onClick={() => setShowInformationForm(true)}
                    >
                      Sigorta Bilgilendirme Formunu
                    </span>{" "}
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        setFieldValue(
                          "informationForm",
                          !values.informationForm
                        )
                      }
                    >
                      kabul ediniz.
                    </span>
                  </label>
                </div>
                <ErrorMessage
                  name="informationForm"
                  component="div"
                  className="text-red-500 text-xs ml-6"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <InformationFormDialog
        isOpen={showInformationForm}
        close={() => {
          setShowInformationForm(false);
        }}
        confirm={() => {
          formikRef.current.setFieldValue("informationForm", true);
          setShowInformationForm(false);
        }}
      />
    </>
  );
}

export default Offer;
