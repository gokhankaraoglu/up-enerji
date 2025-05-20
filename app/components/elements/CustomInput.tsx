import React from "react";
import { Icon, Icons } from "./Icon";
import { ErrorMessage, Field } from "formik";

export enum InputType {
  DATE = "date",
  TEL = "tel",
  EMAIL = "email",
  TEXT = "text",
  NUMBER = "number",
}

interface InputProps {
  id: string;
  type: InputType;
  pattern?: string;
  name?: string;
  autoComplete?: string;
  placeholder?: string;
  maxlength?: number;
  minlength?: number;
  information?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  className?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  message?: string;
  touched?: boolean;
}

function CustomInput({
  id,
  type,
  name,
  pattern,
  autoComplete = "off",
  placeholder,
  maxlength,
  minlength,
  information = undefined,
  onChange,
  className = "",
  value,
  min,
  max,
  disabled = false,
  autoFocus = false,
  message = "",
  touched = false,
}: InputProps) {
  return (
    <div className="input-wrapper vertical">
      <label htmlFor={id} className="label-area mb-2">
        {name}
      </label>
      <Field
        type={type}
        id={id}
        name={id}
        pattern={pattern}
        required={true}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxlength}
        minLength={minlength}
        className={`input-area ${className} ${
          message && touched && "!border-red-500 !border-2"
        }  focus:border-indigo-600 focus:border-2 valid:border-green-400`}
        onBlur={onChange}
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        autoFocus={autoFocus}
      />

      <div className="absolute right-4 top-10 cursor-pointer">
        {type === InputType.DATE && <Icon icon={Icons.CALENDAR_ICON} />}
        {!!information && (
          <div className="relative group">
            <Icon icon={Icons.INFO_ICON} />
            <div className="absolute -right-6 mt-2 w-[90vw] max-w-[470px] bg-blue-100 text-blue-400 text-sm font-light px-4 py-2 rounded shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 border-4 border-red-500 hidden group-hover:block">
              {information}
            </div>
          </div>
        )}
      </div>
      {message && touched && (
        <ErrorMessage name={id} component="p" className="error-message" />
      )}
    </div>
  );
}

export default CustomInput;
