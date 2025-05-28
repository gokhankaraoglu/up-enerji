import { ChangeEvent } from "react";
import CustomSelect from "./elements/CustomSelect";

interface SelectSectionsProps {
  questionID: number;
  questionName: string;
  questionCode: string;
  options: { value: string; label: string }[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  message: string;
  touched: boolean;
}

function SelectSections({
  questionID,
  questionName,
  options,
  onChange,
  message,
  touched,
}: SelectSectionsProps) {
  switch (questionID) {
    // case 43:
    // case 49:
    // case 50:
    // case 76:
    case 105: // PLAKA NO
      // case 106: // PLAKA NO
      // case 76: // ARAC YAKIT TIPI
      return (
        <CustomSelect
          id={questionID.toString()}
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

export default SelectSections;
