import { StyleSheet, I18nManager } from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
    NotificationsButton: {
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.brown,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        borderRadius: 30,
        borderTopRightRadius: 60,
        borderBottomLeftRadius: 60,
        height: 150,
        width: 150,
    },
    NotificationsText: {
        fontSize: 20,
        color: colors.white,
        fontWeight: 'bold',
        margin: 10,
    },
    icon: {
        margin: 10,
    },
});

export default styles;
