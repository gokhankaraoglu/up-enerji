import React, { ChangeEvent, memo } from "react";
import { formatName } from "../utils";
import InputSections from "./InputSections";
import SelectSections from "./SelectSections";
import { SoruDeger, SoruListItem } from "../types/question";

export interface FormElementProps {
  question: SoruListItem;
  error: string;
  touched: boolean;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FormElement: React.FC<FormElementProps> = memo(
  ({ question, value, error, touched, onChange }) => {
    const { SORU_ID, SORU_TIP_ID, SORU_AD, SORU_KOD, SORU_DEGER_LIST } =
      question;
    const options = SORU_DEGER_LIST?.map((option: SoruDeger) => ({
      value: option.DEGER_KOD,
      label: option.DEGER_AD,
    }));
    switch (SORU_TIP_ID) {
      case 1:
        return (
          <InputSections
            questionID={SORU_ID}
            questionName={formatName(SORU_AD)}
            questionCode={SORU_KOD}
            value={value}
            message={error}
            touched={touched}
            onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void}
          />
        );
      case 2:
        return (
          <SelectSections
            questionID={SORU_ID}
            questionName={formatName(SORU_AD)}
            questionCode={SORU_KOD}
            options={options || []}
            onChange={onChange as (e: ChangeEvent<HTMLSelectElement>) => void}
            message={error}
            touched={touched}
            disabled={false}
            defaultValue={value}
          />
        );
      // case 5:
      //   return <Title questionID={SORU_ID} name={formatName(SORU_AD)} />;
      default:
        return null;
    }
  }
);
FormElement.displayName = "FormElement";

export default FormElement;
