import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import sw from './locales/sw.json';

i18n
  .use(LanguageDetector)          // detect from localStorage → navigator → html
  .use(initReactI18next)          // wire it into React
  .init({
    resources: {
      en: { translation: en },
      sw: { translation: sw },
    },
    fallbackLng: 'en',            // if a key is missing in sw, fall back to en
    supportedLngs: ['en', 'sw'],
    interpolation: { escapeValue: false },   // React already escapes
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'pataChakoLang',
      caches: ['localStorage'],   // remember the choice
    },
  });

export default i18n;