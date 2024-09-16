import React, { useState } from 'react';
import { View, Text, Switch, I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../features/tasks/store/store';
import { setLanguage } from '../../features/tasks/redux/languageSlice';
import colors from '../../utils/colors';
import styles from './LanguageSwitcher.styles';
import { useTranslation } from 'react-i18next';
import Alert from '../Alert/Alert'; // Import the custom Alert component

const LANGUAGES = {
  EN: 'en',
  AR: 'ar',
};

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.language);
  
  const [alertVisible, setAlertVisible] = useState(false);

  const toggleLanguage = async () => {
    const newLanguage = currentLanguage === LANGUAGES.EN ? LANGUAGES.AR : LANGUAGES.EN;
    const isRTL = newLanguage === LANGUAGES.AR;

    try {
      if (I18nManager.isRTL !== isRTL) {
        setAlertVisible(true); // Show the custom alert modal
      } else {
        await i18n.changeLanguage(newLanguage); // Update i18n language
        dispatch(setLanguage(newLanguage)); // Update Redux language state
      }
    } catch (error) {
      console.error('Error toggling language:', error);
    }
  };

  const handleAlertClose = async () => {
    const newLanguage = currentLanguage === LANGUAGES.EN ? LANGUAGES.AR : LANGUAGES.EN;
    const isRTL = newLanguage === LANGUAGES.AR;

    try {
      setAlertVisible(false);
      await i18n.changeLanguage(newLanguage); // Update i18n language
      I18nManager.forceRTL(isRTL);
      dispatch(setLanguage(newLanguage)); // Update Redux language state
      RNRestart.Restart(); // Restart the app after language change
    } catch (error) {
      console.error('Error changing language:', error);
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

      {/* Custom Alert Modal */}
      <Alert
        visible={alertVisible}
        message="The app needs to restart to apply the language change."
        onClose={handleAlertClose}
        buttonText="Restart Now"
      />
    </View>
  );
};

export default LanguageSwitcher;
