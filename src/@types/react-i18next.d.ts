import 'react-i18next';
import translationEng from './locales/en/translation.json';
import translationRus from './locales/ru/translationRu.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translationEng';
    resources: {
      en: typeof translationEng;
      ru: typeof translationRus;
    };
  }
}
