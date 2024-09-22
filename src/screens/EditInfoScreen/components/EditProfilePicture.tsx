import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import colors from '../../../utils/colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from './EditEmail.styles';
import { useTranslation } from 'react-i18next';

interface Props {
    value: string;
}

const EditProfilePicture: React.FC<Props> = ({ value }) => {
    const [profilePicture, setProfilePicture] = useState(value);
    const [isSaving, setIsSaving] = useState(false);
    const { i18n } = useTranslation();

    const handleSave = async () => {
        setIsSaving(true);
        const user = auth().currentUser;
        if (user) {
            await firestore().collection('users').doc(user.uid).update({ profilePicture });
        }
        setIsSaving(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Profile Picture URL</Text>
            <TextInput
                style={styles.input}
                value={profilePicture}
                onChangeText={setProfilePicture}
                placeholder="Enter your profile picture URL"
            />
            <TouchableOpacity
                style={styles.button} 
                onPress={handleSave}
                disabled={isSaving}
            >
                {isSaving ? (
                    <ActivityIndicator color={colors.white}/>
                ) : (
                    <Text style={styles.buttonText}>Save</Text>
                )}
            </TouchableOpacity>  
        </View>
    );
};

export default EditProfilePicture;
