import React from "react";
import { LuLoader } from "react-icons/lu";

type Props = {
  onClick?: () => void;
  label: string;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  isLoading?: boolean;
};

const Button = ({ onClick, label, className, type, disabled, isLoading }: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`text-black relative bg-orange hover:bg-orange-hover min-h-[40px] font-light text-md px-3 py-1.5 ${disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className ?? ""}`}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin">
            <LuLoader color="#ffffff" />
          </div>
        </div>
      )
        : (label)}
    </button>
  );
};

export default Button;
