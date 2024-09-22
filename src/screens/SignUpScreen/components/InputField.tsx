import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import styles from './InputField.styles';

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: boolean; 
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, value, onChangeText, secureTextEntry = false, error = false }) => (
  <TextInput
    style={[styles.input, error && styles.errorInput]} 
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    placeholderTextColor='#b3b3b3'
  />
);

export default InputField;