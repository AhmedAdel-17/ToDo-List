import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.newpurple,
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
    backgroundColor: colors.newpurple, // Customize header background color
  },
  headerTitleStyle: {
    fontSize: 24, // Customize the title font size
    fontWeight: 'bold', // Make the title bold
    color: colors.white, // Customize the text color
  },
  headerTintColor:{color: colors.white}, // Tint color for back button and icons

});

export default styles;
