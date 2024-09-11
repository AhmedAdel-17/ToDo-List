// components/LanguageSwitcher.styles.ts
import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  languageButton: {
    position: 'absolute', // This allows you to position the button absolutely.
    top: 20, // Distance from the top of the screen.
    right: 10, // Distance from the right edge of the screen.
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, // Add some padding to make the button more tappable.
    borderRadius: 5, // Optional: rounded corners for the button.
    elevation: 3, // Optional: add some shadow for Android.
    shadowColor: colors.gray, // Optional: add shadow for iOS.
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  languageButtonText: {
    color: colors.white,
    fontSize: 16,
    marginRight: 10,
  },
});
export default styles;