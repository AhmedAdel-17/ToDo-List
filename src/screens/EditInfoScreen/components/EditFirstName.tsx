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

const EditFirstName: React.FC<Props> = ({ value }) => {
    const [firstName, setFirstName] = useState(value);
    const [isSaving, setIsSaving] = useState(false);
    const { i18n } = useTranslation();

    const handleSave = async () => {
        setIsSaving(true);
        const user = auth().currentUser;
        if (user) {
            await firestore().collection('users').doc(user.uid).update({ firstName });
        }
        setIsSaving(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="editFirstName"
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

export default EditFirstName;
