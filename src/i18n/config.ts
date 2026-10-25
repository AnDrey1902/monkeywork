import { createContext, useContext } from "react";
import en from "./en.json";
import ru from "./ru.json";

export type Locale = "ru" | "en";

export const translations: Record<Locale, Record<string, string>> = {
  ru,
  en,
};

export interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType>({
  locale: "ru",
  setLocale: () => {},
  t: (key: string) => key,
});

export const useI18n = () => useContext(I18nContext);
