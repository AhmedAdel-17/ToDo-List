import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.purpleHaze,
  },
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    marginTop: 10,
  },
  headerStyle: {
    backgroundColor: colors.purpleHaze, 
  },
  headerTitleStyle: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: colors.white, 
  },
  headerTintColor:{color: colors.white}, 

});

export default styles;
