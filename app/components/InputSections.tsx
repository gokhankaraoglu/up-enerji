import React, { ChangeEvent } from "react";
import CustomInput, { InputType } from "./elements/CustomInput";

interface InputSectionsProps {
  questionID: number;
  questionName: string;
  questionCode: string;
  message: string;
  touched: boolean;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function InputSections({
  questionID,
  questionName,
  questionCode,
  message,
  touched,
  value,
  onChange,
}: InputSectionsProps) {
  // const today = new Date().toLocaleDateString("en-CA");
  // const nextYear = new Date();
  // nextYear.setFullYear(nextYear.getFullYear() + 1);
  // const oneYearLater = nextYear.toLocaleDateString("en-CA");
  switch (questionID) {
    case 44: // DOĞUM TARİHİ
      return (
        <CustomInput
          id={questionCode}
          type={InputType.DATE}
          name={questionName}
          onChange={onChange}
          value={value}
          message={message}
          touched={touched}
          max={new Date().toISOString().split("T")[0]}
        />
      );
    case 14: // T.C. KİMLİK NUMARASI
      return (
        <CustomInput
          id={questionCode}
          type={InputType.NUMBER}
          name={questionName}
          minlength={11}
          maxlength={11}
          onChange={onChange}
          value={value}
          message={message}
          touched={touched}
        />
      );
    // case 15: // VERGİ KİMLİK NUMARASI
    //   return (
    //     <CustomInput
    //       id={questionCode}
    //       type={InputType.NUMBER}
    //       name={questionName}
    //       message={message}
    //       touched={touched}
    //       onChange={onChange}
    //     />
    //   );
    case 42: // CEP TELEFONU
      return (
        <CustomInput
          id={questionCode}
          type={InputType.TEL}
          name={questionName}
          onChange={onChange}
          placeholder="5554443322"
          value={value}
          message={message}
          touched={touched}
        />
      );
    case 77: // E-MAIL ADRESİ
      return (
        <CustomInput
          id={questionCode}
          type={InputType.TEXT}
          name="E-Mail Adresi"
          onChange={onChange}
          value={value}
          message={message}
          touched={touched}
        />
      );
    case 207: // IMEI NO
      return (
        <CustomInput
          id={questionCode}
          type={InputType.TEXT}
          name={questionName}
          information="Telefonunuzun cihaz ayarları bölümünde Genel>Hakkında alanında bulabilir ve kopyalayabilirsiniz."
          onChange={onChange}
        />
      );
    case 197: // CİHAZ MARKA
    case 199: // MODEL
    case 200: // SERİ NO
    case 201: // PLATFORM
    case 202: // SİPARİŞ NO
      return (
        <CustomInput
          id={questionCode}
          type={InputType.TEXT}
          name={questionName}
          onChange={onChange}
          message={message}
          touched={touched}
        />
      );
    case 203: // EKRAN KIRILMASI
    case 204: // KAZAEN KIRILMA
    case 205: // UZATILMIŞ GARANTİ
    case 206: // CİHAZ BEDELİ
    case 5: // PLAKA NO
      // case 30: // BELGE SERİ NO
      return (
        <CustomInput
          id={questionCode}
          type={InputType.TEXT}
          name={questionName}
          onChange={onChange}
          message={message}
          touched={touched}
        />
      );
    default:
      return null;
  }
}

export default InputSections;
