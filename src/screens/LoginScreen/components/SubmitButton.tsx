import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './SubmitButton.styles';
import colors from '../../../utils/colors';
type Props = {
  onPress: () => void;
  title: string;
  isLoading?: boolean;
  secondary?: boolean;
};

const SubmitButton: React.FC<Props> = ({ onPress, title, isLoading = false, secondary = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, secondary ? styles.secondaryButton : null]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? <ActivityIndicator color={colors.violet} /> : <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default SubmitButton;
