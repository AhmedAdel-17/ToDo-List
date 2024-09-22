import { StyleSheet, I18nManager } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  EditInfoButton: {
    margin: 15,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.brown,
    height: 150,
    width: 150,
    borderRadius: 30,
    borderTopRightRadius:60,
    borderTopLeftRadius:60,
  },
  EditInfoText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
    },
  icon: {
  },
});

export default styles;