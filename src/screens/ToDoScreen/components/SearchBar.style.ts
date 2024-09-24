import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.charcoal,
    color: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 16,
  },
});

export default styles;
