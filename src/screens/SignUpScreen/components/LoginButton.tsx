import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './LoginButton.styles';

interface LoginButtonProps {
  onPress: () => void;
  label: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onPress, label }) => (
  <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

export default LoginButton;
