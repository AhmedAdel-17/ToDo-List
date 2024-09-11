import React from 'react';
import { TextInput, I18nManager, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../../../features/tasks/redux/authslice';
import { RootState } from '../../../features/tasks/store/store';
import styles from './LoginInput.styles';

type Props = {
  type: 'email' | 'password';
  placeholder: string;
  error?: boolean; // Add an error prop to control styling
};

const LoginInput: React.FC<Props> = ({ type, placeholder, error = false }) => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => type === 'email' ? state.auth.email : state.auth.password);

  return (
    <TextInput
      style={[styles.input, error && styles.errorInput]} // Add error styling conditionally
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => dispatch(type === 'email' ? setEmail(text) : setPassword(text))}
      keyboardType={type === 'email' ? 'email-address' : 'default'}
      secureTextEntry={type === 'password'}
      placeholderTextColor='#b3b3b3'
      textAlign={I18nManager.isRTL ? 'right' : 'left'}
    />
  );
};

export default LoginInput;