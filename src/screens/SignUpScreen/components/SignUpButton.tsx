import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './SignUpButton.styles';
import colors from '../../../utils/colors';
interface SignUpButtonProps {
  onPress: () => void;
  label: string;
  isLoading?: boolean;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ onPress, label, isLoading = false }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} disabled={isLoading}>
    {isLoading ? ( 
      <ActivityIndicator color={colors.charcoal} />  
    ) : (
      <Text style={styles.buttonText}>{label}</Text>  
    )}
  </TouchableOpacity>
);

export default SignUpButton;
