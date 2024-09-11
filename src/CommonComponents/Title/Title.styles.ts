import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.purple,
    },
});

export default styles;
