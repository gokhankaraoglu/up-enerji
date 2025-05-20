import * as Yup from "yup";
import { isValidPhoneNumber, isValidTCKN } from "./mask";

export const validationSchema = Yup.object().shape({
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
  TESBELNO: Yup.string().required("Belge seri no zorunludur"),
  ARCKULTIP: Yup.string().required("Araç kullanım tipi zorunludur"),
  ARCKLS: Yup.string().required("Araç kullanım şekli zorunludur"),
  ARCYKTTIP: Yup.string().required("Araç yakıt tipi zorunludur"),
});
