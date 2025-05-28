/**
 * Renders select fields for various question types with strict typing and accessibility.
 */
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
          />
        );
      default:
        return null;
    }
  }
);
SelectSections.displayName = "SelectSections";

export default SelectSections;
