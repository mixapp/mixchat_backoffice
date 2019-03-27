import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import translationEN from '../src/locales/en/translation.json';
import translationRU from '../src/locales/ru/translation.json';

// the translations
const resources = {
  'en-US': {
    translation: translationEN
  },
  'ru-RU': {
    translation: translationRU
  }
};

i18n
  .use(detector) // auto detect the user language
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    //debug: true,
    detection: {
      // order and from where user language should be detected
      order: ['localStorage'],
    },
    resources,
    fallbackLng: ['ru-RU', 'en-US'], // use en if detected lng is not available

    //keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;