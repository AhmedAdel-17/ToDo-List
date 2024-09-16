// ../src/CommonComponents/LogoutButton/LogoutButton.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './LogoutButton.styles';

interface LogoutButtonProps {
  onPress: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Icon name="sign-out" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

export default LogoutButton;
