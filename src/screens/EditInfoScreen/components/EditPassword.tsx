import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import colors from '../../../utils/colors';
import auth from '@react-native-firebase/auth';
import styles from './EditEmail.styles';
import { useTranslation } from 'react-i18next';


const EditPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const { i18n } = useTranslation();

    const handleSave = async () => {
        setIsSaving(true);
        const user = auth().currentUser;
        if (user) {
            await user.updatePassword(password);
        }
        setIsSaving(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your new password"
                secureTextEntry
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSave}
                disabled={isSaving}
            >
                {isSaving ? (
                    <ActivityIndicator color={colors.white} />
                ) : (
                    <Text style={styles.buttonText}>Save</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default EditPassword;
