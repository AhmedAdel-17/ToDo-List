// components/TaskItem.styles.ts
import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors'

export default StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.violet,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  taskText: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
    marginLeft: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: colors.gray,
  },
});
