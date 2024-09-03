
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
i18n.use(initReactI18next).init({
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        'Hey Yo Im at home': 'Hey Yo Im at home',
        'Hey Yo Im inside Room': 'Hey Yo Im inside Room',
      },
    },
    ar: {
      translation: {
        'To-Do List': 'قائمة المهام',
        'Search Tasks...': '...ابحث عن المهام',
        'New Task':'اضافة مهمة جديدة',
        'Uncompleted Tasks': 'المهام غير المكتملة',
        'Completed Tasks':'المهام المكتملة',
        'ToDo':'قائمة المهام',
        'Profile':'الحساب',
        'Birth Date': 'تاريخ الميلاد',
        'Last Name': 'الاسم الاخير',
        'First Name':'الاسم الاول',
        'Email':'الحساب',
        'SignUp':'التسجيل',
        'Password':'كلمة السر',
        'Birth Date (YYYY-MM-DD)':'تاريخ الميلاد (سنة - شهر - يوم)',
        'Profile Picture URL':'رابط الصورة الشخصية',
        'Already a member? Login': 'مسجل بالفعل؟ تسجيل الدخول',
        'Sign Up':'التسجيل',
        'Not a member? Sign Up':'غير مسجل؟ سجل الان',
        'Login':'تسجيل الدخول',
        'Login Successful':'تم تسجيل الدخول بنجاح',
      },
    },
  },
});
export default i18n;