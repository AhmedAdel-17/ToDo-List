import React from 'react';
import { View, Text, Switch, Alert } from 'react-native';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import colors from '../../utils/colors';
import styles from './LanguageSwitcher.styles';
import { useTranslation } from 'react-i18next';

const LANGUAGES = {
  EN: 'en',
  AR: 'ar',
};

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = async () => {
    const newLanguage = i18n.language === LANGUAGES.EN ? LANGUAGES.AR : LANGUAGES.EN;
    const isRTL = newLanguage === LANGUAGES.AR;

    try {
      if (I18nManager.isRTL !== isRTL) {
        Alert.alert(
          'Restart Required',
          'The app needs to restart to apply the language change.',
          [
            {
              text: 'Restart Now',
              onPress: async () => {
                try {
                  await i18n.changeLanguage(newLanguage);
                  I18nManager.forceRTL(isRTL);
                  //RNRestart.Restart();
                } catch (error) {
                  console.error('Error changing language:', error);
                  Alert.alert('Error', 'An error occurred while changing the language.');
                }
              },
            },
          ],
        );
      } else {
        await i18n.changeLanguage(newLanguage);
      }
    } catch (error) {
      console.error('Error toggling language:', error);
      Alert.alert('Error', 'An error occurred while toggling the language.');
    }
  };

  return (
    <View style={styles.languageButton}>
      <Text style={styles.languageButtonText}>
        {i18n.language === LANGUAGES.EN ? 'English' : 'العربية'}
      </Text>
      <Switch
        value={i18n.language === LANGUAGES.EN}
        onValueChange={toggleLanguage}
        trackColor={{ true: colors.newpurple, false: colors.newpurple }}
        thumbColor={colors.white}
      />
    </View>
  );
};

export default LanguageSwitcher;
