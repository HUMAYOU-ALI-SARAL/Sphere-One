import React from "react";

type SelectProps = {
  label?: string;
  defaultValue?: string;
  options?: { value: string; label: string }[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
} & React.InputHTMLAttributes<HTMLSelectElement>;

const Select = ({ label, options, onChange, defaultValue, ...props }: SelectProps) => {
  const { className, ...restProps } = props;
  return (
    <div className="flex items-center gap-4">
      {label && <label htmlFor="checkbox">{label}</label>}

      <select
        className={`flex items-center justify-center border-none rounded-[5px] bg-sp-gray-600 px-4 focus:ring-orange-hover focus:border-orange-hover ${
          className ?? ""
        }`}
        onChange={onChange}
        defaultValue={defaultValue}
        {...restProps}
      >
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
