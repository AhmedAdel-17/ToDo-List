import React from 'react';
import { View, Image } from 'react-native';
import styles from './TopBar.styles';

interface TopBarProps {
  profilePictureUrl: string;
}

const TopBar: React.FC<TopBarProps> = ({ profilePictureUrl }) => (
  <View style={styles.topBar}>
    <Image style={styles.avatar} source={{ uri: profilePictureUrl }} />
  </View>
);

export default TopBar;
