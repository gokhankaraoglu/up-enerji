"use client";

import Cookies from "js-cookie";
import FormElement from "../components/FormElement";
import CustomButton from "../components/elements/CustomButton";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  convertToISODate,
  createExpirationDate,
  delay,
  getSessionStorage,
} from "../utils";
import { setGuid } from "../hooks/useSetGuid";
import { SoruListItem } from "../types/question";
import { useRouter } from "next/navigation";
import { ProductDetail } from "../types/product";
import {
  fetchProductQuestions,
  submitForm,
  submitQuestionAnswer,
} from "../utils/api/product";
import { normalizePhoneNumber, normalizeTCKN } from "../utils/mask";
import Footer from "../components/Footer";
import { ACCESS_TOKEN } from "../utils/api/axiosClient";
import { Form, Formik, FormikProps } from "formik";
import { FormElements } from "../types/form";
import { validationSchema } from "../utils/validations";

function ProductForm() {
  const router = useRouter();
  const [questions, setQuestions] = useState<SoruListItem[]>([]);
  const [policeGuid, setPoliceGuid] = useState<string>("");
  const policeId = Cookies.get("policeId");
  const formikRef = useRef<FormikProps<typeof initialValues>>(null);
  let lastInsuranceDate: string | number | undefined = undefined;

  useEffect(() => {
    const productDetail = getSessionStorage<ProductDetail>("product");

    const checkToken = async () => {
      const accessToken = Cookies.get(ACCESS_TOKEN);
      if (!accessToken) {
        await delay(500);
        return checkToken();
      }
      await fetchProducts();
    };

    const fetchProducts = async () => {
      if (!productDetail) {
        router.push("/");
        return;
      }

      const newPoliceGuid = await setGuid();
      const fetchedQuestions = await fetchProductQuestions(
        newPoliceGuid,
        productDetail
      );

      await submitQuestions(fetchedQuestions, newPoliceGuid);
      setPoliceGuid(newPoliceGuid);
    };

    checkToken();
  }, []);

  const submitQuestions = async (
    questions: SoruListItem[],
    policeGuid: string
  ) => {
    const answerMapping: { [key: number]: string | undefined } = {
      49: "34",
      50: "1183",
    };

    for (const question of questions) {
      const answer = answerMapping[question.SORU_ID];
      if (answer !== undefined) {
        try {
          await submitQuestionAnswerMethod(policeGuid, question, answer);
        } catch (error) {
          console.error(
            `Error submitting question ID ${question.SORU_ID}:`,
            error
          );
        }
      }
    }
  };

  async function handleAnswerChange(
    question: SoruListItem,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setFieldValue: (field: string, value: unknown) => void
  ) {
    let value = event.target.value;

    if (question.SORU_ID === 14) {
      value = normalizeTCKN(value);
    }
    if (question.SORU_ID === 42) {
      value = normalizePhoneNumber(value);
    }

    setFieldValue(question.SORU_KOD, value);

    await submitQuestionAnswerMethod(policeGuid, question, value);
  }

  async function submitQuestionAnswerMethod(
    policeGuid: string,
    question: SoruListItem,
    value?: string | number | null
  ) {
    if (!value) return;
    if (question.MASKE_TIP_ID === 3) {
      const [year, month, day] = (value as string).split("-");
      value = `${day}/${month}/${year}`;
    }
    const updatedQuestions = await submitQuestionAnswer(
      policeGuid,
      question,
      value
    );

    if (!lastInsuranceDate) {
      const lastInsurance = updatedQuestions.find(
        (item) => item.SORU_ID === 83
      );
      if (lastInsurance?.DEGER_KOD) {
        lastInsuranceDate = lastInsurance?.DEGER_KOD;
        const lastInsuranceDateISO = convertToISODate(
          lastInsurance?.DEGER_KOD as string
        );

        const formattedLastInsuranceDate = new Date(
          lastInsuranceDateISO as string
        );
        formattedLastInsuranceDate.setFullYear(
          formattedLastInsuranceDate.getFullYear() + 1
        );
        const oneYearLaterFromLastInsuranceDate =
          formattedLastInsuranceDate.toLocaleDateString("en-CA");
        const answerMapping: { [key: number]: string | null } = {
          21: lastInsuranceDateISO,
          22: oneYearLaterFromLastInsuranceDate,
        };
        for (const question of questions) {
          const answer = answerMapping[question.SORU_ID];
          if (answer !== undefined) {
            try {
              await submitQuestionAnswerMethod(policeGuid, question, answer);
            } catch (error) {
              console.error(
                `Error submitting question ID ${question.SORU_ID}:`,
                error
              );
            }
          }
        }
      }
    }
    setQuestions(updatedQuestions);
  }

  async function handleSendForm() {
    const expirationDate = createExpirationDate(6);
    try {
      if (policeGuid) {
        const policeId = await submitForm(policeGuid);
        Cookies.set("policeId", policeId, { expires: expirationDate });
        router.push("/teklif-listesi");
      }
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  }

  function goBackOffer() {
    router.push("/teklif-listesi");
  }

  const initialValues: FormElements = {
    TCK: "",
    DGMTAR: "",
    CEPTEL: "",
    EMAIL: "",
    PLK: "",
    TESBELNO: "",
    ARCKULTIP: "",
    ARCKLS: "",
    ARCYKTTIP: "",
  };

  return (
    <div className="min-w-[375px] max-w-[450px] mb-4 mt-7">
      <div className="flex flex-col bg-white  rounded-xl">
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSendForm}
            enableReinitialize
            innerRef={formikRef}
          >
            {({ errors, touched, setFieldValue, setFieldTouched }) => {
              return (
                <Form autoComplete="off" className="p-5 md:p-10 !pb-5">
                  {questions.length > 0 ? (
                    <div className="flex flex-col">
                      {questions.map((question) => (
                        <FormElement
                          question={question}
                          key={question.SIRA_NO}
                          onChange={(
                            event: ChangeEvent<
                              HTMLInputElement | HTMLSelectElement
                            >
                          ) => {
                            handleAnswerChange(question, event, setFieldValue);
                            setFieldTouched(question.SORU_KOD, true, false);
                          }}
                          error={
                            typeof errors[
                              question.SORU_KOD as keyof typeof errors
                            ] === "string"
                              ? (errors[
                                  question.SORU_KOD as keyof typeof errors
                                ] as string)
                              : ""
                          }
                          touched={
                            touched[
                              question.SORU_KOD as keyof typeof touched
                            ] === true
                          }
                        />
                      ))}
                      <div className="flex flex-col items-center">
                        {policeId && (
                          <CustomButton
                            type="button"
                            saturated={true}
                            className="mb-2.5"
                            onClick={goBackOffer}
                          >
                            Teklife Dön
                          </CustomButton>
                        )}
                        <CustomButton
                          onClick={() => {
                            formikRef.current?.submitForm();
                          }}
                          type="button"
                          className="mb-2.5"
                        >
                          Teklif Oluştur
                        </CustomButton>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-7 flex flex-col gap-6 items-center">
                      <div className="title-placeholder skeleton self-start "></div>
                      <div className="title-placeholder skeleton self-start "></div>
                      <div className="input-placeholder skeleton"></div>
                      <div className="title-placeholder skeleton self-start "></div>
                      <div className="input-placeholder skeleton"></div>
                      <div className="title-placeholder skeleton self-start "></div>
                      <div className="input-placeholder skeleton"></div>
                      <div className="title-placeholder skeleton self-start "></div>
                      <div className="input-placeholder skeleton"></div>
                      <div className="title-placeholder skeleton self-start "></div>
                      <div className="input-placeholder skeleton"></div>
                      <div className="title-placeholder skeleton self-start "></div>
                      <div className="input-placeholder skeleton"></div>
                      <div className="title-placeholder skeleton self-start "></div>
                      <div className="input-placeholder skeleton"></div>
                      <div className="title-placeholder skeleton self-start "></div>
                      <div className="input-placeholder skeleton"></div>
                      <div className="title-placeholder skeleton self-start "></div>
                      <div className="input-placeholder skeleton"></div>
                      <div className="title-placeholder skeleton self-start "></div>
                      <div className="input-placeholder skeleton"></div>
                      <div className="title-placeholder skeleton self-start "></div>
                      <div className="input-placeholder skeleton"></div>
                      <div className="title-placeholder skeleton self-start "></div>
                      <div className="input-placeholder skeleton"></div>
                    </div>
                  )}
                </Form>
              );
            }}
          </Formik>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default ProductForm;
