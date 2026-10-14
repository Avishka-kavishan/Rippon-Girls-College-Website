"use client";

import React, { createContext, useContext, useEffect } from "react";
import { Language, TranslationSchema, SUPPORTED_LANGUAGES, LanguageOption } from "@/locales/types";
import { translations } from "@/locales";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
  languages: SUPPORTED_LANGUAGES,
});

const STORAGE_KEY = "rippon_language_preference";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Clear any previous language preference from localStorage so everything stays English
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = "en";
      document.documentElement.removeAttribute("data-lang");
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language: "en",
        setLanguage: () => {},
        t: translations.en,
        languages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
