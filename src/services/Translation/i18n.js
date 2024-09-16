import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

i18n
  .use(initReactI18next) // Connects i18n instance to React
  .init({
    compatibilityJSON: 'v3',
    lng: getLocales()[0].languageCode, // Set initial language
    fallbackLng: 'en', // Fallback to English
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
