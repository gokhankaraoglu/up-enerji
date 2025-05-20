import React, { ChangeEvent } from "react";
import Title from "./elements/Title";
import { formatName } from "../utils";
import InputSections from "./InputSections";
import SelectSections from "./SelectSections";
import { SoruDeger, SoruListItem } from "../types/question";

interface FormElementProps {
  question: SoruListItem;
  error: string;
  touched: boolean;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
function FormElement({
  question,
  value,
  error,
  touched,
  onChange,
}: FormElementProps) {
  const { SORU_ID, SORU_TIP_ID, SORU_AD, SORU_KOD, SORU_DEGER_LIST } = question;
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
          onChange={onChange}
        />
      );
    case 2:
      return (
        <SelectSections
          questionID={SORU_ID}
          questionName={formatName(SORU_AD)}
          questionCode={SORU_KOD}
          options={options || []}
          onChange={onChange}
          message={error}
          touched={touched}
        />
      );
    case 5:
      return <Title questionID={SORU_ID} name={formatName(SORU_AD)} />;
  }
}

export default FormElement;
