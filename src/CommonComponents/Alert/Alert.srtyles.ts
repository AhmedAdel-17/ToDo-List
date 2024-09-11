import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertBox: {
      width: 300,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    alertMessage: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
    },
    alertButton: {
      backgroundColor: colors.newpurple,
      padding: 10,
      borderRadius: 5,
      width: 100, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    alertButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });
export default styles;