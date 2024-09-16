import React from 'react';
import { View, Text, Switch, I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../features/tasks/store/store';
import { setLanguage } from '../../features/tasks/redux/languageSlice';
import colors from '../../utils/colors';
import styles from './LanguageSwitcher.styles';
import { useTranslation } from 'react-i18next';

const LANGUAGES = {
  EN: 'en',
  AR: 'ar',
};

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.language);

  const toggleLanguage = async () => {
    const newLanguage = currentLanguage === LANGUAGES.EN ? LANGUAGES.AR : LANGUAGES.EN;
    const isRTL = newLanguage === LANGUAGES.AR;

    try {
      await i18n.changeLanguage(newLanguage);
      if (I18nManager.isRTL !== isRTL) {
        I18nManager.forceRTL(isRTL);
      }
      dispatch(setLanguage(newLanguage));
      RNRestart.Restart();
    } catch (error) {
      console.error('Error toggling language:', error);
    }
  };

  return (
    <View style={styles.languageButton}>
      <Text style={styles.languageButtonText}>
        {i18n.language === LANGUAGES.EN ? 'English' : 'العربية'}
      </Text>
      <Switch
        value={currentLanguage === LANGUAGES.EN}
        onValueChange={toggleLanguage}
        trackColor={{ true: colors.newpurple, false: colors.newpurple }}
        thumbColor={colors.white}
      />
    </View>
  );
};

export default LanguageSwitcher;