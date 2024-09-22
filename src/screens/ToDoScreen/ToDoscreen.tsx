import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App'; 
import styles from './ToDo.styles';
import FilterButtons from './components/FilterButtons';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import SearchBar from './components/SearchBar';

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
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); 
  const handleLogout = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await auth().signOut();
        navigation.navigate('Login'); 
      } else {
        console.warn('No user currently signed in.');
      }
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };
  

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
      headerTitle:t('todo_head'),
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerTintColor: styles.headerTintColor,
      headerTitleAlign: 'center',
    });
  }, [i18n.language, navigation]);

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
    if (!userId) return;

    await firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('tasks')
      .doc(taskId)
      .update({
        completed: !isCompleted,
      });
  };

  const deleteTask = async (taskId: string) => {
    if (!userId) return;

    await firebase.firestore()
      .collection('users')
      .doc(userId)
      .collection('tasks')
      .doc(taskId)
      .delete();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTasks}
        ListHeaderComponent={() => (
          <>
            <SearchBar 
              search={search} 
              setSearch={setSearch} 
              filterTasks={filterTasks} 
              selectedFilter={selectedFilter} 
            />
            <FilterButtons selectedFilter={selectedFilter} onFilterPress={handleFilterPress} />
          </>
        )}
        ListFooterComponent={() => (
          <TaskInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
          />
        )}
      />
    </View>
  );
};

export default ToDoScreen;
