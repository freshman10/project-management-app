import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as translationEng from './locales/en/translation.json';
import * as translationRus from './locales/ru/translation.json';

export const defaultNS = 'translation';
export const resources = {
  en: {
    translation: translationEng,
  },
  ru: {
    translation: translationRus,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: localStorage.getItem('language') || 'en',
  resources,
  defaultNS,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
