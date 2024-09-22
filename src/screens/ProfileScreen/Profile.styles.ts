import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.light,
  },
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: colors.silverLight,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    marginTop: 10,
  },
  headerStyle: {
    backgroundColor: colors.violet, 
  },
  headerTitleStyle: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: colors.white, 
  },
  headerTintColor:{
    color: colors.white
  }, 
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
