import React, { useState } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import styles from './Login.styles';
import LoginInput from './components/LoginInput';
import SubmitButton from './components/SubmitButton';
import LanguageSwitch from '../../CommonComponents/LanguageSwitcher/LanguageSwitcher';
import Title from '../../CommonComponents/Title/Title';
import Alert from '../../CommonComponents/Alert/Alert';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/tasks/store/store';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const email = useSelector((state: RootState) => state.auth.email);
  const password = useSelector((state: RootState) => state.auth.password);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { t } = useTranslation();

  const validateFields = () => {
    let valid = true;

    if (!email) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validateFields()) {
      setAlertMessage(t('please_enter_data'));
      setAlertVisible(true);
      return;
    }

    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      await AsyncStorage.setItem('userToken', userCredential.user.uid); // Store user token
      setAlertMessage(t('login_success'));
      setAlertVisible(true);
      setLoading(false);
      navigation.navigate('MainTabs');
    } catch (error) {
      setLoading(false);
      if (emailError) {
        setAlertMessage(t('incorrect_email'));
      } else if (passwordError) {
        setAlertMessage(t('incorrect_password'));
      } else {
        setAlertMessage(t('login_failed'));
      }
      setAlertVisible(true);
    }
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <LanguageSwitch />
      <Title title={t('login')} />
      <LoginInput type="email" placeholder={t('email')} error={emailError} />
      <LoginInput type="password" placeholder={t('password')} error={passwordError} />
      <SubmitButton onPress={handleLogin} isLoading={isLoading} title={t('login')} />
      <SubmitButton onPress={handleSignUpPress} title={t('not_a_member_sign_up')} secondary />
      <Alert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
};

export default LoginScreen;
