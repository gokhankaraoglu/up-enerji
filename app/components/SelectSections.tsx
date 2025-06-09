import React, { ChangeEvent, memo } from "react";
import CustomSelect from "./elements/CustomSelect";

export interface SelectSectionsProps {
  questionID: number;
  questionName: string;
  questionCode: string;
  options: { value: string; label: string }[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  message: string;
  touched: boolean;
  disabled?: boolean;
  defaultValue?: string;
}

const SelectSections: React.FC<SelectSectionsProps> = memo(
  ({
    questionID,
    questionName,
    questionCode,
    options,
    onChange,
    message,
    touched,
    disabled = false,
    defaultValue,
  }) => {
    switch (questionID) {
      case 105: // PLAKA NO
        return (
          <CustomSelect
            id={questionCode}
            name={questionName}
            options={options}
            onChange={onChange}
            message={message}
            touched={touched}
            disabled={disabled}
            defaultValue={defaultValue}
          />
        );
      default:
        return null;
    }
  }
);
SelectSections.displayName = "SelectSections";

export default SelectSections;
