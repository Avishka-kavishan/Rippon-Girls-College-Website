import { Language, TranslationSchema } from "./types";
import { enTranslations } from "./en";
import { siTranslations } from "./si";
import { taTranslations } from "./ta";

export * from "./types";

export const translations: Record<Language, TranslationSchema> = {
  en: enTranslations,
  si: siTranslations,
  ta: taTranslations,
};

export function getTranslations(lang: Language): TranslationSchema {
  return translations[lang] || translations.en;
}
