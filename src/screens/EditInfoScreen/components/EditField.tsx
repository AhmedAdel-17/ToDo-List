// EditField.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import colors from '../../../utils/colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-elements';
import styles from './EditField.styles';

interface EditFieldProps {
    fieldKey: string;
    value: string;
    placeholder: string;
    icon: string;
    secure?: boolean;
    isEmail?: boolean;
}

const EditField: React.FC<EditFieldProps> = ({ fieldKey, value, placeholder, icon, secure = false, isEmail = false }) => {
    const [inputValue, setInputValue] = useState(value);
    const [isSaving, setIsSaving] = useState(false);
    const { i18n } = useTranslation();

    const handleSave = async () => {
        setIsSaving(true);
        const user = auth().currentUser;

        if (user) {
            const updates = { [fieldKey]: inputValue };

            if (isEmail) {
                await user.updateEmail(inputValue); // For email update
            }
            await firestore().collection('users').doc(user.uid).update(updates);
        }

        setIsSaving(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Icon name={icon} type="font-awesome" color={colors.brown} />
                <Text style={styles.label}>{placeholder}</Text>
            </View>
            <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder={placeholder}
                secureTextEntry={secure}
                keyboardType={isEmail ? 'email-address' : 'default'}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave} disabled={isSaving}>
                {isSaving ? (
                    <ActivityIndicator color={colors.white} />
                ) : (
                    <Text style={styles.buttonText}>{i18n.t('save')}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default EditField;
