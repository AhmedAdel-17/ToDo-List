// components/TaskInput.styles.ts
import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

export default StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: colors.brownDark,
    color: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: colors.gray,
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
