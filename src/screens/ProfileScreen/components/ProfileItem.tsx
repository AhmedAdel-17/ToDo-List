import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ProfileItem.styles';

interface ProfileItemProps {
  text: string;
  subText: string;
  icon: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ text, subText, icon }) => (
  <View style={styles.itemContainer}>
    <Icon name={icon} size={20} color="white" style={styles.icon} />
    <View style={styles.textContainer}>
      <Text style={styles.headText}>{text}</Text>
      <Text style={styles.infoText}>{subText}</Text>
    </View>
  </View>
);

export default ProfileItem;
