import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

// Import your language JSON files
import loginEn from './locales/en/login.json';
import profileEn from './locales/en/profile.json';
import signupEn from './locales/en/signup.json';
import todoEn from './locales/en/todo.json';

import loginAr from './locales/ar/login.json';
import profileAr from './locales/ar/profile.json';
import signupAr from './locales/ar/signup.json';
import todoAr from './locales/ar/todo.json';

i18n
  .use(initReactI18next) // Connects i18next to React
  .init({
    compatibilityJSON: 'v3', // Ensure compatibility with JSON v3 for older versions
    lng: getLocales()[0].languageCode, // Default language from device
    fallbackLng: 'en', // Fallback language in case a translation is missing
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
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
