import { StyleSheet, I18nManager } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: colors.violet,
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    color: 'black',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  errorInput: {
    borderColor: 'red', // Change border color to red when there’s an error
  },
});

export default styles;
