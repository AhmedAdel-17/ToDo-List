import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './Title.styles';
type HeaderProps = {
    title: string; // Pass "login" or "signup" based on the screen
};

const Title: React.FC<HeaderProps> = ({ title }) => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t(title)}</Text>
        </View>
    );
};

export default Title;
