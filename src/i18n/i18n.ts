import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en/translation.json';
import ruTranslation from './locales/ru/translation.json';
import deTranslation from './locales/de/translation.json';
import { SupportedLanguages } from '@/shared/enums/supportedLanguages';

export const DEFAULT_LANGUAGE = SupportedLanguages.EN;

const resources = {
  [SupportedLanguages.EN]: {
    translation: enTranslation,
  },
  [SupportedLanguages.RU]: {
    translation: ruTranslation,
  },
  [SupportedLanguages.DE]: {
    translation: deTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'localStorage'],
      lookupFromPathIndex: 1,
      lookupFromSubdomainIndex: 0,
      caches: ['localStorage'],
    },
  });

i18n.on('languageChanged', lng => {
  console.log('Language changed to:', lng);
});

export default i18n;
