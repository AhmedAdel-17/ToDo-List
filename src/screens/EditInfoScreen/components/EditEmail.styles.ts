import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        color: colors.brown,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        color: colors.brown,
    },
    input: {
        height: 40,
        borderColor: colors.brown,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: colors.brown,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
    },
});

export default styles;
