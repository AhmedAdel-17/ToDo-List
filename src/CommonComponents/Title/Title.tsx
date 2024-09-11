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
            <Image
            source={require('../../../assets/icons/Claudia-removebg-preview.png')}
            style={{ width: 150, height: 150 }}
            resizeMode= 'contain'/>
            <Text style={styles.title}>{t(title)}</Text>
        </View>
    );
};

export default Title;
