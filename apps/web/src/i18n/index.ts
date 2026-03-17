import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_QUERY_PARAM,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  normalizeLanguage,
} from './config';

const resources = {
  fr: { translation: fr },
  en: { translation: en },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: DEFAULT_LANGUAGE,
      supportedLngs: [...SUPPORTED_LANGUAGES],
      debug: import.meta.env.DEV,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['querystring', 'localStorage', 'navigator'],
        lookupQuerystring: LANGUAGE_QUERY_PARAM,
        lookupLocalStorage: LANGUAGE_STORAGE_KEY,
        caches: ['localStorage'],
      },
      react: {
        useSuspense: false,
      },
    });
}

const syncHtmlLang = (language: string) => {
  const current = normalizeLanguage(language);
  document.documentElement.lang = current;
};

if (typeof window !== 'undefined') {
  syncHtmlLang(i18n.language);
  i18n.on('languageChanged', syncHtmlLang);
}

export default i18n;
