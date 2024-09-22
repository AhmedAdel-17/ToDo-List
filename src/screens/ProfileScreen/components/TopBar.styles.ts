import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  topBar: {
    height: 150,
    backgroundColor: colors.brownLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 20,
    marginLeft: 10,
    marginRight:10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderColor: colors.brown,
    borderWidth: 2,
  },
});

export default styles;
