import React from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import colors from '../../../utils/colors';
import styles from './InputBar.styles';

interface InputBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholderKey: string;
  onSubmit?: () => void;
  isTaskInput?: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ value, onChangeText, placeholderKey, onSubmit, isTaskInput = false }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={t(placeholderKey)}
        placeholderTextColor={colors.white}
        value={value}
        onChangeText={onChangeText}
        keyboardAppearance="default"
        keyboardType="default"
      />
      {isTaskInput && (
        <TouchableOpacity style={styles.addButton} onPress={onSubmit}>
          <Icon name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputBar;
