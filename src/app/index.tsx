import { useCallback, useEffect, useMemo, useState } from "react";
import { I18nContext, type Locale, translations } from "../i18n/config";
import App from "./App";

const LOCALE_STORAGE_KEY = "monkeywork-lang";

function getInitialLocale(): Locale {
  if (typeof localStorage === "undefined") return "ru";
  const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (saved === "ru" || saved === "en") return saved;
  return "ru";
}

export default function AppProvider() {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale === "ru" ? "ru" : "en";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      return translations[locale][key] ?? translations.en[key] ?? key;
    },
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return (
    <I18nContext.Provider value={value}>
      <App />
    </I18nContext.Provider>
  );
}
