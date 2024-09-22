import { StyleSheet, I18nManager } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  languageButton: {
    backgroundColor: colors.brown,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    width:150,
    height:150,
    margin: 15,
    borderRadius: 30,
    borderTopLeftRadius:60,
    borderBottomRightRadius:60,
  },
  languageButtonText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
    margin: 10,
  },
  icon: {
    margin: 10,
  }
});

export default styles;
