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
  setSessionStorage,
} from "../utils";
import { setGuid } from "../hooks/useSetGuid";
import { SoruListItem } from "../types/question";
import { useRouter, useSearchParams } from "next/navigation";
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
import { CorporateFormElements, PersonalFormElements } from "../types/form";
import {
  corporateFormValidation,
  personalFormValidation,
} from "../utils/validations";
import { Credentials } from "../types";
import React from "react";
import LoadingPlaceholder from "../components/elements/LoadingPlaceholder";
import { getDistrictCenterCode } from "../utils/cityDistrictCodes";
import Toggle, { UserType } from "../components/elements/Toggle";
import { getUserInfo } from "../utils/api/user";

const personalInitialValues: PersonalFormElements = {
  TCK: "",
  DGMTAR: "",
  CEPTEL: "",
  EMAIL: "",
  PLK: "",
  ARCKULTIP: "1",
};
const corporateInitialValues: CorporateFormElements = {
  VKN: "",
  CEPTEL: "",
  EMAIL: "",
  PLK: "",
};

function ProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uniqueId = searchParams.get("uniqueId") || null;
  const today = new Date().toLocaleDateString("en-CA");
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const oneYearLater = nextYear.toLocaleDateString("en-CA");

  const [questions, setQuestions] = useState<SoruListItem[]>([]);
  const [policeGuid, setPoliceGuid] = useState<string>("");
  const [userType, setUserType] = useState(UserType.Personal);

  const [userInfo, setUserInfo] = useState<Credentials | undefined>(undefined);
  const [initialValuesState, setInitialValueState] = useState<
    PersonalFormElements | CorporateFormElements
  >(personalInitialValues);

  const policeId = Cookies.get("policeId");
  const formikRef =
    useRef<FormikProps<PersonalFormElements | CorporateFormElements>>(null);
  const lastVehicleUsageTypeAnswerRef = useRef<string | undefined>(undefined);
  const lastInsuranceDateRef = {
    current: undefined as string | number | undefined,
  };

  useEffect(() => {
    if (userType === UserType.Corporate) {
      setInitialValueState(corporateInitialValues);
    }
    if (userType === UserType.Personal) {
      setInitialValueState(personalInitialValues);
    }
  }, [userType]);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserInfo(uniqueId);
      setUserInfo(fetchedUser);
      if (fetchedUser) {
        if (fetchedUser.VKN) {
          setInitialValueState({ ...corporateInitialValues, ...fetchedUser });
          setUserType(UserType.Corporate);
        }
        if (fetchedUser.TCK) {
          setInitialValueState({ ...personalInitialValues, ...fetchedUser });
          setUserType(UserType.Personal);
        }
      }
    };
    fetchUser();
  }, []);

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

      await submitQuestions(fetchedQuestions, newPoliceGuid, userInfo);
      setPoliceGuid(newPoliceGuid);
    };

    checkToken();
  }, [userType]);

  async function autoAnswerQuestions(
    policeGuid: string,
    questions: SoruListItem[],
    answerMapping: { [key: number]: string | null }
  ) {
    for (const question of questions) {
      const answer = answerMapping[question.SORU_ID];
      if (answer) {
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

  const submitQuestions = async (
    questions: SoruListItem[],
    policeGuid: string,
    credentials?: Credentials
  ) => {
    const answerMapping: { [key: number]: string | null } = {
      49: "34",
      50: "1183",
      76: "BENZİN",
      105: "1",
      21: today,
      22: oneYearLater,
      14: credentials?.TCK ?? null,
      44: credentials?.DGMTAR ?? null,
      42: credentials?.CEPTEL ?? null,
      77: credentials?.EMAIL ?? null,
    };

    await autoAnswerQuestions(policeGuid, questions, answerMapping);
  };

  function setVehicleData(updatedQuestions: SoruListItem[]) {
    const getById = (id: number) =>
      updatedQuestions.find((item) => item.SORU_ID === id);
    setSessionStorage("vehicle", {
      plate: getById(5)?.DEGER_KOD,
      year: getById(3)?.DEGER_AD,
      brand: getById(1)?.DEGER_AD,
      model: getById(2)?.DEGER_AD,
    });
  }

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

    await handleSetCityasAuto();
  }

  function formatMaskedDate(value: string): string {
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  }

  async function handleVehicleUsageType(updatedQuestions: SoruListItem[]) {
    const vehicleUsageQuestion = updatedQuestions.find(
      (item) => item.SORU_ID === 105
    );
    if (vehicleUsageQuestion?.DEGER_KOD) {
      const vehicleUsage = vehicleUsageQuestion.DEGER_KOD;
      if (!vehicleUsage) return;
      const vehicleUsageTypeQuestion = updatedQuestions.find(
        (item) => item.SORU_ID === 106
      );
      if (!vehicleUsageTypeQuestion) return;
      const [selectedVehicleUsageType] =
        vehicleUsageTypeQuestion.SORU_DEGER_LIST;
      const newAnswer = selectedVehicleUsageType?.DEGER_KOD;
      if (newAnswer && lastVehicleUsageTypeAnswerRef.current !== newAnswer) {
        lastVehicleUsageTypeAnswerRef.current = newAnswer;
        await autoAnswerQuestions(policeGuid, questions, { 106: newAnswer });
      }
    }
  }

  async function handleLastInsuranceDate(updatedQuestions: SoruListItem[]) {
    if (!lastInsuranceDateRef.current) {
      const lastInsurance = updatedQuestions.find(
        (item) => item.SORU_ID === 83
      );
      if (lastInsurance?.DEGER_KOD) {
        lastInsuranceDateRef.current = lastInsurance.DEGER_KOD;
        const lastInsuranceDateISO =
          convertToISODate(lastInsurance.DEGER_KOD as string) ?? undefined;
        if (!lastInsuranceDateISO) return;
        const formattedLastInsuranceDate = new Date(lastInsuranceDateISO);
        formattedLastInsuranceDate.setFullYear(
          formattedLastInsuranceDate.getFullYear() + 1
        );
        const oneYearLaterFromLastInsuranceDate =
          formattedLastInsuranceDate.toLocaleDateString("en-CA");
        await autoAnswerQuestions(policeGuid, questions, {
          21: lastInsuranceDateISO,
          22: oneYearLaterFromLastInsuranceDate,
        });
      }
    }
  }

  async function handleSetCityasAuto() {
    const plate = questions.find((item) => item.SORU_ID === 5);
    if (!plate?.DEGER_KOD) return;
    const plateValue = (plate?.DEGER_KOD as string) || "";
    const cityCodeStr = plateValue.substring(0, 2).replace(/^0+/, "");
    await autoAnswerQuestions(policeGuid, questions, {
      49: cityCodeStr,
      50: getDistrictCenterCode(cityCodeStr) as string,
    });
  }

  async function submitQuestionAnswerMethod(
    policeGuid: string,
    question: SoruListItem,
    value?: string | number | null
  ) {
    if (!value) return;
    if (question.MASKE_TIP_ID === 3) {
      value = formatMaskedDate(value as string);
    }

    const updatedQuestions = await submitQuestionAnswer(
      policeGuid,
      question,
      value
    );
    await handleVehicleUsageType(updatedQuestions);
    await handleLastInsuranceDate(updatedQuestions);
    setVehicleData(updatedQuestions);
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

  return (
    <div className="min-w-[375px] max-w-[450px] mb-4 mt-7">
      <div className="flex flex-col bg-white rounded-xl">
        <div>
          <Formik
            initialValues={initialValuesState}
            validationSchema={
              userType === UserType.Personal
                ? personalFormValidation
                : corporateFormValidation
            }
            onSubmit={handleSendForm}
            enableReinitialize
            innerRef={formikRef}
          >
            {({ values, errors, touched, setFieldValue }) => {
              return (
                <Form autoComplete="off" className="p-5 md:p-10 !pb-5">
                  {questions.length > 0 ? (
                    <>
                      <Toggle
                        value={userType}
                        onChange={(value: UserType) => setUserType(value)}
                      />
                      <div className="flex flex-col mt-5">
                        {questions.map((question) => {
                          if (!(question.SORU_KOD in initialValuesState))
                            return null;
                          return (
                            <FormElement
                              question={question}
                              key={question.SIRA_NO}
                              value={values[question.SORU_KOD]}
                              onChange={(
                                event: ChangeEvent<
                                  HTMLInputElement | HTMLSelectElement
                                >
                              ) => {
                                handleAnswerChange(
                                  question,
                                  event,
                                  setFieldValue
                                );
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
                          );
                        })}
                        <div className="flex flex-col items-center">
                          {policeId && (
                            <CustomButton
                              type="button"
                              saturated={true}
                              className="mb-2.5"
                              onClick={goBackOffer}
                              aria-label="Teklife Dön"
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
                            aria-label="Teklif Oluştur"
                          >
                            Teklif Oluştur
                          </CustomButton>
                        </div>
                      </div>
                    </>
                  ) : (
                    <LoadingPlaceholder />
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
