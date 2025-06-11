import React, { ChangeEvent, memo } from "react";
import CustomInput, { InputType } from "./elements/CustomInput";

export interface InputSectionsProps {
  questionID: number;
  questionName: string;
  questionCode: string;
  message: string;
  touched: boolean;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputSections: React.FC<InputSectionsProps> = memo(
  ({
    questionID,
    questionName,
    questionCode,
    message,
    touched,
    value,
    onChange,
  }) => {
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
      case 15: // VERGİ KİMLİK NUMARASI
        return (
          <CustomInput
            id={questionCode}
            type={InputType.NUMBER}
            name={questionName}
            message={message}
            touched={touched}
            onChange={onChange}
            value={value}
          />
        );
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
        return (
          <CustomInput
            id={questionCode}
            type={InputType.TEXT}
            name={questionName}
            onChange={onChange}
            message={message}
            touched={touched}
            value={value ? value.toUpperCase() : value}
          />
        );
      default:
        return null;
    }
  }
);
InputSections.displayName = "InputSections";

export default InputSections;
