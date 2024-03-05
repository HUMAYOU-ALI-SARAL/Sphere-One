import React from "react";
import { LuLoader } from "react-icons/lu";

type Props = {
  message?: string
};

const Loader = ({ message }: Props) => {
  return (
    <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center z-[999]">
      <div className="animate-spin">
        <LuLoader color="#ffffff" />
      </div>
      <span className="mx-2 text-white">{message}</span>
    </div>
  );
};

export default Loader;
