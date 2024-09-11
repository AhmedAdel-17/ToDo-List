// src/styles/HeaderStyles.ts
import { StyleSheet } from 'react-native';
import colors from '../../utils/colors'; // Make sure you have your colors defined

const HeaderStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.newpurple, // Header background color
  },
  headerTitleStyle: {
    fontSize: 24, // Font size of title
    fontWeight: 'bold', // Bold title
    color: colors.white, // Title color
  },
});

export default HeaderStyles;
