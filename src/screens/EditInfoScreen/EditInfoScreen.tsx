import React, { useEffect } from 'react';
import { I18nManager, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import styles from './EditInfoScreen.styles';
import EditField from './components/EditField';
import colors from '../../utils/colors';
type NavigationProp = StackNavigationProp<RootStackParamList, 'EditInfo'>;

const EditInfoScreen: React.FC = () => {
  const { i18n } = useTranslation();
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const currentLang = i18n.language;
    const isRTL = currentLang === 'ar';
    if (isRTL !== I18nManager.isRTL) {
      I18nManager.forceRTL(isRTL);
    }
  }, [i18n.language]);

  const handleBackPress = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Icon name="log-out-outline"  color= {colors.brown} size={30}/>
        <Text style={styles.backText}>{i18n.t('back')}</Text>
      </TouchableOpacity>

      <ScrollView>
        <EditField header = {i18n.t('first_name')} fieldKey="firstName" value="" placeholder={i18n.t('editFirstName')} icon="user" />
        <EditField header = {i18n.t('last_name')} fieldKey="lastName" value="" placeholder={i18n.t('editLastName')} icon="user" />
        <EditField header = {i18n.t('email')} fieldKey="email" value="" placeholder={i18n.t('editEmail')} icon="envelope" isEmail />
        <EditField header = {i18n.t('password')} fieldKey="password" value="" placeholder={i18n.t('editPassword')} icon="lock" secure />
        <EditField header = {i18n.t('birthdate')} fieldKey="birthDate" value="" placeholder={i18n.t('editBirthdate')} icon="calendar" />
        <EditField header = {i18n.t('profile_picture')} fieldKey="profilePictureUrl" value="" placeholder={i18n.t('editProfilePic')} icon="image" />
      </ScrollView>
    </View>
  );
};

export default EditInfoScreen;
