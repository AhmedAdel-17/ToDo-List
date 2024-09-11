import React, { useState } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../../features/tasks/redux/authslice';
import { RootState } from '../../features/tasks/store/store';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../../CommonComponents/LanguageSwitcher/LanguageSwitcher';
import InputField from './components/InputField';
import SignUpButton from './components/SignUpButton';
import LoginButton from './components/LoginButton';
import styles from './SignUp.styles';
import Title from '../../CommonComponents/Title/Title';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import Alert from '../../CommonComponents/Alert/Alert';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.auth.email);
  const password = useSelector((state: RootState) => state.auth.password);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');

  // Loading and Alert states
  const [isLoading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Error states
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

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

    if (!firstName) {
      setFirstNameError(true);
      valid = false;
    } else {
      setFirstNameError(false);
    }

    if (!lastName) {
      setLastNameError(true);
      valid = false;
    } else {
      setLastNameError(false);
    }

    return valid;
  };

  const handleSignUp = async () => {
    if (!validateFields()) {
      setAlertMessage(t('fill_all'));
      setAlertVisible(true);
      return;
    }

    setLoading(true);  
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      await firebase.firestore().collection('users').doc(userId).set({
        email,
        firstName,
        lastName,
        birthDate,
        profilePictureUrl,
      });

      setAlertMessage(t('signup_success_alert'));
      setAlertVisible(true);
      navigation.navigate('Login');
    } catch (error) {
      setAlertMessage(t('try_again'));
      setAlertVisible(true);
    } finally {
      setLoading(false);  
    }
  };

  return (
    <View style={styles.container}>
      <Title title={t('signup')} />
      <LanguageSwitch />
      <InputField 
        placeholder={t('email')} 
        value={email} 
        onChangeText={(text) => dispatch(setEmail(text))} 
        error={emailError}
      />
      <InputField 
        placeholder={t('password')} 
        value={password} 
        onChangeText={(text) => dispatch(setPassword(text))} 
        secureTextEntry 
        error={passwordError} 
      />
      <InputField 
        placeholder={t('first_name')} 
        value={firstName} 
        onChangeText={setFirstName} 
        error={firstNameError}
      />
      <InputField 
        placeholder={t('last_name')} 
        value={lastName} 
        onChangeText={setLastName} 
        error={lastNameError}
      />
      <InputField 
        placeholder={t('birthday')} 
        value={birthDate} 
        onChangeText={setBirthDate} 
      />
      <InputField 
        placeholder={t('profile_picture')} 
        value={profilePictureUrl} 
        onChangeText={setProfilePictureUrl} 
      />
      
      <SignUpButton onPress={handleSignUp} label={t('signup')} isLoading={isLoading} />
      <LoginButton onPress={() => navigation.navigate('Login')} label={t('already_member')} />

      <Alert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
};

export default SignUpScreen;
