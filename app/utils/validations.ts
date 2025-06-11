import * as Yup from "yup";
import { isValidPhoneNumber, isValidTCKN } from "./mask";

export const personalFormValidation = Yup.object().shape({
  TCK: Yup.string()
    .required("TC Kimlik No zorunludur")
    .test("isValidTCKN", "Geçerli bir TC Kimlik No girin", isValidTCKN),
  DGMTAR: Yup.string().required("Doğum tarihi zorunludur"),
  CEPTEL: Yup.string()
    .required("Telefon numarası zorunludur")
    .test(
      "isValidPhone",
      "Geçerli bir telefon numarası girin",
      isValidPhoneNumber
    ),
  EMAIL: Yup.string()
    .email("Geçerli bir email adresi girin")
    .required("Email zorunludur"),
  PLK: Yup.string().required("Plaka no zorunludur"),
  ARCKULTIP: Yup.string().required("Araç kullanım tipi zorunludur"),
});

export const corporateFormValidation = Yup.object().shape({
  VKN: Yup.string().required("Vergi Kimlik No zorunludur"),
  CEPTEL: Yup.string()
    .required("Telefon numarası zorunludur")
    .test(
      "isValidPhone",
      "Geçerli bir telefon numarası girin",
      isValidPhoneNumber
    ),
  EMAIL: Yup.string()
    .email("Geçerli bir email adresi girin")
    .required("Email zorunludur"),
  PLK: Yup.string().required("Plaka no zorunludur"),
  ARCKULTIP: Yup.string().required("Araç kullanım tipi zorunludur"),
});

export const confirmationForm = Yup.object().shape({
  declaration: Yup.boolean()
    .oneOf([true], "Hasarsızlık beyanını kabul etmelisiniz")
    .required("Hasarsızlık beyanı zorunludur"),
  informationForm: Yup.boolean()
    .oneOf([true], "Sigorta Bilgilendirme Formunu kabul etmelisiniz")
    .required("Sigorta Bilgilendirme Formu zorunludur"),
});
