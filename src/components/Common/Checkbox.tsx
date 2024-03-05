import React from "react";

type CheckboxProps = {
  value?: string;
  label?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({
  value,
  label,
  checked,
  onChange,
  className,
  ...props
}: CheckboxProps) => {
  return (
    <div className="flex items-center gap-4">
      {label && <label htmlFor="checkbox">{label}</label>}
      <input
        checked={checked}
        id="checkbox"
        type="checkbox"
        value={value}
        onChange={onChange}
        className={`appearance-none w-6 h-6 rounded-sm border-2 border-white bg-transparent 
                    checked:bg-orange checked:border-0
                    focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
                    disabled:border-steel-400 disabled:bg-steel-400
        `}
        {...props}
      />
    </div>
  );
};

export default Checkbox;
