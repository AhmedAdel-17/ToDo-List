import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch, I18nManager } from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../redux/authslice';
import { RootState } from '../redux/store';
import colors from '../styles/colors';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

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
    const { t, i18n } = useTranslation();

    const handleSignUp = async () => {
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

            Alert.alert(t('Sign Up Successful'), t('You have signed up successfully!'));
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert(t('Sign Up Failed'), t('Please try again.'));
        }
    };

    const toggleLanguage = () => {
        const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
        const isRTL = newLanguage === 'ar';

        I18nManager.forceRTL(isRTL);
        I18nManager.allowRTL(isRTL);  // This allows the UI to support RTL layout
        i18n.changeLanguage(newLanguage).then(() => {
            // Refresh the UI to reflect language change
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
            <Text style={styles.title}>{t('Sign Up')}</Text>
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
                secureTextEntry
                placeholderTextColor='#b3b3b3'
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
            />
            <TextInput
                style={styles.input}
                placeholder={t('First Name')}
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                placeholderTextColor='#b3b3b3'
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
            />
            <TextInput
                style={styles.input}
                placeholder={t('Last Name')}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                placeholderTextColor='#b3b3b3'
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
            />
            <TextInput
                style={styles.input}
                placeholder={t('Birth Date (YYYY-MM-DD)')}
                value={birthDate}
                onChangeText={(text) => setBirthDate(text)}
                placeholderTextColor='#b3b3b3'
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
            />
            <TextInput
                style={styles.input}
                placeholder={t('Profile Picture URL')}
                value={profilePictureUrl}
                onChangeText={(text) => setProfilePictureUrl(text)}
                placeholderTextColor='#b3b3b3'
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>{t('Sign Up')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>{t('Already a member? Login')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    languageSwitchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    languageSwitchText: {
        fontSize: 16,
        color: colors.violet,
    },
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
        shadowColor: colors.violet,
        textAlign: I18nManager.isRTL ? 'right' : 'left', // Adjust text alignment for RTL
    },
    button: {
        backgroundColor: colors.violet,
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
        backgroundColor: colors.charcoal,
    },
});

export default SignUpScreen;
