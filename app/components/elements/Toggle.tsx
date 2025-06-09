import React from "react";

export enum UserType {
  Personal = "bireysel",
  Corporate = "kurumsal",
}

interface ToggleProps {
  value: UserType;
  onChange: (value: UserType) => void;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ value, onChange, className = "" }) => {
  return (
    <div
      className={`flex w-full max-w-xs mx-auto rounded-md border border-gray-200 bg-white overflow-hidden ${className}`}
      role="group"
      aria-label="Kullanıcı Tipi Seçimi"
    >
      <button
        type="button"
        className={`flex-1 py-2 text-lg font-light transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          value === UserType.Personal
            ? "bg-blue-700 text-white shadow-md"
            : "bg-white text-blue-700 hover:bg-gray-50 cursor-pointer"
        }`}
        onClick={() => onChange(UserType.Personal)}
        aria-pressed={value === UserType.Personal}
      >
        Bireysel
      </button>
      <button
        type="button"
        className={`flex-1 py-2 text-lg font-light transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          value === UserType.Corporate
            ? "bg-blue-700 text-white shadow-md"
            : "bg-white text-blue-700 hover:bg-gray-50 cursor-pointer"
        }`}
        onClick={() => onChange(UserType.Corporate)}
        aria-pressed={value === UserType.Corporate}
      >
        Kurumsal
      </button>
    </div>
  );
};

export default Toggle;
