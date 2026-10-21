import { Language, TranslationSchema } from "./types";
import { enTranslations } from "./en";

export * from "./types";

export const translations: Record<Language, TranslationSchema> = {
  en: enTranslations,
};

export function getTranslations(_lang?: Language): TranslationSchema {
  return enTranslations;
}
