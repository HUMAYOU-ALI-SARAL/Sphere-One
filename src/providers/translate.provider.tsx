"use client";
import React, { PropsWithChildren, createContext, useContext } from "react";

interface TranslateContextType {
  _t: (text: string) => string;
}

const TranslateContext = createContext<TranslateContextType | undefined>(
  undefined
);

export const useTranslate = (): TranslateContextType => {
  const context = useContext(TranslateContext);

  if (!context) {
    throw new Error("useTraslate must be used within a TranslateProvider");
  }
  return context;
};

const TranslateProvider = ({ children }: PropsWithChildren) => {
  const _t = (text: string) => {
    return text;
  };

  return (
    <TranslateContext.Provider
      value={{
        _t,
      }}
    >
      {children}
    </TranslateContext.Provider>
  );
};

export default TranslateProvider;
