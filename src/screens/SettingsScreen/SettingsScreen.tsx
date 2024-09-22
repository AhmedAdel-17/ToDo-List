import React, { useState } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './Settings.styles';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import LogoutButton from './components/LogoutButton';
import ChangeLanguageButton from './components/ChangeLanguageButton';
import EditInfoButton from './components/EditInfo';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { i18n } = useTranslation();
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [isLoadingEditInfo, setIsLoadingEditInfo] = useState(false);

  const handleLogout = () => {
    setIsLoadingLogout(true);
    auth().signOut().then(() => {
      setIsLoadingLogout(false);
      navigation.navigate('Login');
    });
  };

  const handleEditInfo = () => {
    setIsLoadingEditInfo(true);
    navigation.navigate('EditInfo'); 
    setIsLoadingEditInfo(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <EditInfoButton onPress={handleEditInfo} isLoading={isLoadingEditInfo} />
      </View>
      <View style={styles.row}>
        <ChangeLanguageButton />
        <LogoutButton onPress={handleLogout} isLoading={isLoadingLogout} />
      </View>
    </View>
  );
};

export default SettingsScreen;
