import React from "react";

type InputProps = {
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  containerClass?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  value,
  placeholder,
  onChange,
  leftAdornment,
  rightAdornment,
  containerClass,
  className,
  ...props
}: InputProps) => {
  return (
    <div className={`relative flex items-center gap-4 ${containerClass ?? ""}`}>
      <input
        type="text"
        className={`w-full bg-sp-gray-600 h-11 border border-none placeholder-neutral-500 text-white text-sm rounded-lg focus:ring-orange-hover focus:border-orange-hover py-2.5 px-4 
            ${leftAdornment ? "pl-12" : ""} 
            ${rightAdornment ? "pr-12" : ""}
            ${className ?? ""}
        `}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {leftAdornment && (
        <div className="absolute top-1/2 left-0 translate-x-1/2 -translate-y-1/2">
          {leftAdornment}
        </div>
      )}
      {rightAdornment && (
        <div className="absolute top-1/2 right-1 -translate-y-1/2">
          {rightAdornment}
        </div>
      )}
    </div>
  );
};

export default Input;
