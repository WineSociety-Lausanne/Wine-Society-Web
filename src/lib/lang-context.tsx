"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { dictionaries, Locale, Dictionary } from "./dictionaries";

type LangContextType = {
  locale: Locale;
  t: Dictionary;
  toggleLocale: () => void;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fr");

  const toggleLocale = () => {
    setLocale((prev) => (prev === "fr" ? "en" : "fr"));
  };

  return (
    <LangContext.Provider
      value={{ locale, t: dictionaries[locale], toggleLocale }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used within LangProvider");
  return context;
}
