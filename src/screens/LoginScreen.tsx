import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch, I18nManager } from 'react-native';
import auth from '@react-native-firebase/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../redux/authslice';
import { RootState } from '../redux/store';
import colors from '../styles/colors';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [isPressed, setPressState] = useState(false);
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.auth.email);
  const password = useSelector((state: RootState) => state.auth.password);
  const { t, i18n } = useTranslation();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert(t('Login Failed'), t('Please enter email and password'));
      return;
    }
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert(t('Login Successful'), t('You have logged in successfully!'));
        setLoading(false);
        navigation.navigate('MainTabs');
      })
      .catch(error => {
        setLoading(false);
        if (error.code === 'auth/user-not-found') {
          Alert.alert(t('Login Failed'), t('No user found with this email.'));
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert(t('Login Failed'), t('Incorrect password.'));
        } else {
          Alert.alert(t('Login Failed'), error.message);
        }
      });
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
    setPressState(false);
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    const isRTL = newLanguage === 'ar';

    I18nManager.forceRTL(isRTL);
    I18nManager.allowRTL(isRTL);  // This allows the UI to support RTL layout
    i18n.changeLanguage(newLanguage).then(() => {
      // Refresh the UI to reflect language change
      RNRestart.Restart();
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.languageButton}>
        <Text style={styles.languageButtonText}>
          {i18n.language === 'en' ? 'English' : 'العربية'}
        </Text>
        <Switch
          value={i18n.language === 'en'}
          onValueChange={toggleLanguage}
          trackColor={{ true: colors.newpurple, false: colors.newpurple }}
          thumbColor={colors.white}
        />
      </View>
      <Text style={styles.title}>{t('Login')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('Email')}
        value={email}
        onChangeText={(text) => dispatch(setEmail(text))}
        keyboardType='email-address'
        placeholderTextColor='#b3b3b3'
        textAlign={I18nManager.isRTL ? 'right' : 'left'} // Adjust text alignment for RTL
      />
      <TextInput
        style={styles.input}
        placeholder={t('Password')}
        value={password}
        onChangeText={(text) => dispatch(setPassword(text))}
        placeholderTextColor='#b3b3b3'
        secureTextEntry
        textAlign={I18nManager.isRTL ? 'right' : 'left'} // Adjust text alignment for RTL
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t('Login')}</Text>}
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton, isPressed ? styles.pressedButton : null]} 
        onPressIn={() => setPressState(true)} 
        onPressOut={() => setPressState(false)} 
        onPress={handleSignUpPress}>
        <Text style={styles.buttonText}>{t('Not a member? Sign Up')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.newpurple,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    marginRight: 10,
  },
  pressedButton: {
    opacity: 0.5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.violet,
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: colors.violet,
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    color: 'black',
    textAlign: I18nManager.isRTL ? 'right' : 'left', // Adjust text alignment for RTL
  },
  button: {
    backgroundColor: colors.charcoal,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: colors.violet,
  },
});

export default LoginScreen;
