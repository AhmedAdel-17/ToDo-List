import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  languageButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: colors.brown,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconContainer: {
    marginRight: 10,
  },
  languageButtonText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default styles;
