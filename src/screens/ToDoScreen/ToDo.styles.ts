import { StyleSheet, I18nManager } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 120, 
    backgroundColor: colors.light,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.violet,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', 
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: colors.violet,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    color: colors.charcoal,
    marginRight: 10,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  inputSearch: {
    flex: 1,
    height: 50,
    borderColor: colors.violet,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    color: colors.charcoal,
    marginRight: 10,
    marginBottom: 20,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  filterButtonsContainer: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', 
    justifyContent: 'center',
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    height: 50,
    borderColor: colors.violet,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 5,
  },
  selectedFilterButton: {
    backgroundColor: colors.violet,
  },
  filterButtonText: {
    fontWeight: 'bold',
    color: colors.charcoal,
  },
  selectedFilterButtonText: {
    color: colors.white,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContainer: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.purple, 
    borderRadius: 12,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  taskText: {
    flex: 1,
    color: colors.white,
    fontSize: 18,
    marginLeft: 10,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  headerStyle: {
    backgroundColor: colors.newpurple,
  },
  headerTitleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white, 
  },
  headerTintColor:{color: colors.white}, 
});
export default styles;
