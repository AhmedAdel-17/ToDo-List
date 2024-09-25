import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, BackHandler, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App'; 
import styles from './ToDo.styles';
import InputBar from './components/InputBar';
import FilterButtons from './components/FilterButtons';
import TaskItem from './components/TaskItem';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

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
  }, [tasks, search, selectedFilter]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('todo_head'),
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerTintColor: styles.headerTintColor,
      headerTitleAlign: 'center',
    });
  }, [i18n.language, navigation]);

  useEffect(() => {
    const backAction = () => {
      Keyboard.dismiss();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const filterTasks = useCallback((searchTerm: string, filter: 'all' | 'completed' | 'uncompleted') => {
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
  }, [tasks, completedTasks, uncompletedTasks]);

  const handleFilterPress = useCallback((filter: 'all' | 'completed' | 'uncompleted') => {
    setSelectedFilter((prevFilter) => {
      const newFilter = prevFilter === filter ? 'all' : filter;
      filterTasks(search, newFilter);
      return newFilter;
    });
  }, [filterTasks, search]);

  const addTask = useCallback(async () => {
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
  }, [newTask, userId]);

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
    <TouchableWithoutFeedback onPress={Keyboard.isVisible} accessible={false}>
      <View style={styles.container}>
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
            />
          )}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={(
            <>
              <InputBar 
                value={search}
                onChangeText={setSearch}
                placeholderKey= {t("search_tasks")}
                isTaskInput={false} 
              />
              <FilterButtons selectedFilter={selectedFilter} onFilterPress={handleFilterPress} />
            </>
          )}
          ListFooterComponent={(
            <InputBar
              value={newTask}
              onChangeText={setNewTask}
              placeholderKey= {t("new_task")}
              onSubmit={addTask}
              isTaskInput={true}
            />
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ToDoScreen;
