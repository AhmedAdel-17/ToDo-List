import React from 'react';
import { TouchableOpacity, Text, I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../features/tasks/store/store';
import { setLanguage } from '../../../features/tasks/redux/languageSlice';
import styles from './ChangeLanguageButton.styles';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../../utils/colors';

const LANGUAGES = {
    EN: 'en',
    AR: 'ar',
};

const ChangeLanguageButton: React.FC = () => {
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
            RNRestart.Restart();  // Restart app to apply RTL changes
        } catch (error) {
            console.error('Error toggling language:', error);
        }
    };

    return (
        <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
            <>
            <Icon name='language-outline' size={30} color={colors.white} style={styles.icon}/>
            <Text style={styles.languageButtonText}>
                {i18n.language === LANGUAGES.EN ? 'عربي' : 'English'}
            </Text>
            </>
        </TouchableOpacity>
    );
};

export default ChangeLanguageButton;
