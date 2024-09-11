import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.violet,
    marginBottom: 30,
  },
});

export default styles;
