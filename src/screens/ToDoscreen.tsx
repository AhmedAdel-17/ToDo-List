import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Switch, I18nManager } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const ToDoScreen: React.FC = () => {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);
  const [uncompletedTasks, setUncompletedTasks] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'uncompleted'>('all');
  const userId = auth().currentUser?.uid;
  const { t, i18n } = useTranslation();
  const navigation = useNavigation(); // Access navigation

  useEffect(() => {
    if (userId) {
      const unsubscribe = firebase.firestore()
        .collection('users')
        .doc(userId)
        .collection('tasks')
        .onSnapshot(snapshot => {
          const fetchedTasks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTasks(fetchedTasks);
        });

      return () => unsubscribe();
    }
  }, [userId]);

  useEffect(() => {
    const completed = tasks.filter(task => task.completed);
    const uncompleted = tasks.filter(task => !task.completed);

    setCompletedTasks(completed);
    setUncompletedTasks(uncompleted);

    filterTasks(search, selectedFilter);
  }, [tasks]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('To-Do List'), // Update the header title when language changes
    });
  }, [i18n.language]);

  const filterTasks = (searchTerm: string, filter: 'all' | 'completed' | 'uncompleted') => {
    let filtered = tasks;

    if (filter === 'completed') {
      filtered = completedTasks;
    } else if (filter === 'uncompleted') {
      filtered = uncompletedTasks;
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  };

  const handleFilterPress = (filter: 'all' | 'completed' | 'uncompleted') => {
    setSelectedFilter(filter);
    filterTasks(search, filter);
  };

  const addTask = async () => {
    if (newTask.trim() === '' || !userId) return;

    await firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('tasks')
      .add({
        title: newTask,
        completed: false,
      });
    setNewTask('');
  };

  const toggleTaskCompletion = async (taskId: string, isCompleted: boolean) => {
    if (userId) {
      await firebase.firestore()
        .collection('users')
        .doc(userId)
        .collection('tasks')
        .doc(taskId)
        .update({ completed: !isCompleted });
    }
  };

  const deleteTask = async (taskId: string) => {
    if (userId) {
      await firebase.firestore()
        .collection('users')
        .doc(userId)
        .collection('tasks')
        .doc(taskId)
        .delete();
    }
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    const isRTL = newLanguage === 'ar';

    I18nManager.forceRTL(isRTL);
    I18nManager.allowRTL(isRTL);  // This allows the UI to support RTL layout
    i18n.changeLanguage(newLanguage).then(() => {
      // Refresh the UI to reflect language change
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.languageButton}>
        <Text style={styles.languageButtonText}>
          {i18n.language === 'en' ? 'English' : 'العربية'}
        </Text>
        <Switch
          value={i18n.language === 'en'}
          onValueChange={toggleLanguage}
          trackColor={{ true: colors.newpurple, false: colors.newpurple }}
          thumbColor={colors.white}
        />
      </View>

      <Text style={styles.title}>{t('To-Do List')}</Text>

      <FlatList
        data={filteredTasks}
        ListHeaderComponent={() => (
          <>
            <TextInput
              style={styles.inputSearch}
              placeholder={t('Search Tasks...')}
              value={search}
              onChangeText={text => {
                setSearch(text);
                filterTasks(text, selectedFilter);
              }}
            />
            <View style={styles.filterButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedFilter === 'uncompleted' && styles.selectedFilterButton,
                ]}
                onPress={() => handleFilterPress('uncompleted')}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedFilter === 'uncompleted' && styles.selectedFilterButtonText,
                  ]}
                >
                  {t('Uncompleted Tasks')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedFilter === 'completed' && styles.selectedFilterButton,
                ]}
                onPress={() => handleFilterPress('completed')}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedFilter === 'completed' && styles.selectedFilterButtonText,
                  ]}
                >
                  {t('Completed Tasks')}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={t('New Task')}
              placeholderTextColor="#b3b3b3"
              value={newTask}
              onChangeText={setNewTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Icon name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity
              onPress={() => toggleTaskCompletion(item.id, item.completed)}
            >
              <Icon
                name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={item.completed ? colors.white : "#fff"}
              />
            </TouchableOpacity>
            <Text style={[styles.taskText, item.completed && styles.completedTask]}>
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Icon name="trash-bin" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.violet,
    marginBottom: 20,
    textAlign: 'center',
  },
  languageButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.newpurple,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', // Adjust direction for RTL
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
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', // Adjust direction for RTL
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
    backgroundColor: colors.violet,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContainer: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', 
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.newpurple,
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
});

export default ToDoScreen;
