import i18n from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import { parse as parseICUMessage } from '@formatjs/icu-messageformat-parser';
import IntlMessageFormat from 'intl-messageformat';

import translationEN from 'locales/en/translation.json';
import translationRU from 'locales/ru/translation.json';

IntlMessageFormat.__parse = (message, options) => {
  return parseICUMessage(message, { ...options, requiresOtherClause: false });
};

const icu = new (ICU as any)({
  parseErrorHandler: (err: Error, key: string, res: string) => {
    // eslint-disable-next-line no-console
    console.error(`Error parsing message, "${key}": ${err.message}`);
    return res;
  },
});

i18n
  .use(icu)
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: translationRU,
      },
      en: {
        translation: translationEN,
      },
    },
    lng: localStorage.getItem('study-portal_language') || 'ru',
    fallbackLng: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
