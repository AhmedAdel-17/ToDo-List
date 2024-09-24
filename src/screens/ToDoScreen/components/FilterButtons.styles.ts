// components/FilterButtons.styles.ts
import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

export default StyleSheet.create({
    filterButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    filterButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: colors.CreamyBrown,
    },
    filterButtonText: {
        color: colors.white,
        fontSize: 16,
    },
    selectedFilterButton: {
        backgroundColor: colors.TrueTurquoise,
    },
    selectedFilterButtonText: {
        color: colors.white,
    },
});
