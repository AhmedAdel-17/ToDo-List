import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: colors.violet,
    padding: 10,
    borderRadius: 15,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  headText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: colors.white,
  },
});

export default styles;
