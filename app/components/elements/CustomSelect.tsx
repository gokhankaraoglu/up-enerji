import { ErrorMessage, Field } from "formik";
import React from "react";

interface SelectProps {
  id: string;
  name: string;
  options: { value: string; label: string }[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  message?: string;
  touched?: boolean;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
}

function CustomSelect({
  id,
  name,
  options,
  onChange,
  message = "",
  touched = false,
  className = "",
  disabled = false,
  defaultValue = "1",
}: SelectProps) {
  return (
    <div className="select-wrapper">
      <label htmlFor={id} className="select-label mb-2">
        {name}
      </label>
      <Field
        as="select"
        className={`select-area ${className} ${
          message && touched && "!border-red-500 !border-2"
        }  focus:border-indigo-600 focus:border-2 valid:border-green-400`}
        id={id}
        name={id}
        required={true}
        onBlur={onChange}
        disabled={disabled}
        value={defaultValue}
        onChange={onChange}
      >
        <option value="">Lütfen bir {name.toLocaleLowerCase()} seçiniz.</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      {message && touched && (
        <ErrorMessage name={id} component="p" className="error-message" />
      )}
    </div>
  );
}

export default CustomSelect;
