// EditField.styles.ts
import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        marginLeft: 10,
        color: colors.brown,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.brown,
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
    },
    button: {
        backgroundColor: colors.brown,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
    },
});

export default styles;
