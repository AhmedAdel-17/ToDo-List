import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

import loginEn from './locales/en/login.json';
import profileEn from './locales/en/profile.json';
import signupEn from './locales/en/signup.json';
import todoEn from './locales/en/todo.json';

import loginAr from './locales/ar/login.json';
import profileAr from './locales/ar/profile.json';
import signupAr from './locales/ar/signup.json';
import todoAr from './locales/ar/todo.json';

i18n
  .use(initReactI18next) // Bind react-i18next to i18next
  .init({
    lng: getLocales()[0].languageCode, // Automatically detect the language
    fallbackLng: 'en', // Default language if not detected
    resources: {
      en: {
        translation: {
          ...loginEn,
          ...profileEn,
          ...signupEn,
          ...todoEn,
        },
      },
      ar: {
        translation: {
          ...loginAr,
          ...profileAr,
          ...signupAr,
          ...todoAr,
        },
      },
    },
  });

export default i18n;