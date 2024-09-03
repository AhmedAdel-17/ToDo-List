import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addTask, deleteTask, toggleTaskCompletion, setTasks, setInput } from '../redux/todoSlice';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';

type Task = {
    id: string;
    task: string;
    completed: boolean;
};

const TasksScreen: React.FC<{ navigation: any }> = ({ navigation }) => { // Ensure navigation prop is included
    const input = useSelector((state: RootState) => state.tasks.input);
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch: AppDispatch = useDispatch();
    const userId = auth().currentUser?.uid;

    useEffect(() => {
        const fetchTasks = async () => {
            if (!userId) return;
            try {
                const snapshot = await firebase.firestore().collection('users').doc(userId).collection('tasks').get();
                const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Task[];
                dispatch(setTasks(tasksData));
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [dispatch, userId]);

    const handleAddTask = async () => {
        if (userId && input) {
            const newTask: Task = { id: `${Date.now()}`, task: input, completed: false };
            try {
                await firebase.firestore().collection('users').doc(userId).collection('tasks').doc(newTask.id).set(newTask);
                dispatch(addTask(newTask));
                dispatch(setInput(''));
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        if (userId) {
            try {
                await firebase.firestore().collection('users').doc(userId).collection('tasks').doc(taskId).delete();
                dispatch(deleteTask(taskId));
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    };

    const handleToggleTaskCompletion = async (task: Task) => {
        if (userId) {
            const updatedTask = { ...task, completed: !task.completed };
            try {
                await firebase.firestore().collection('users').doc(userId).collection('tasks').doc(task.id).set(updatedTask);
                dispatch(toggleTaskCompletion(updatedTask));
            } catch (error) {
                console.error("Error toggling task completion:", error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Add a task"
                value={input}
                onChangeText={(text) => dispatch(setInput(text))}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskContainer}>
                        <Text
                            style={[styles.taskText, item.completed && styles.taskCompleted]}
                            onPress={() => handleToggleTaskCompletion(item)}
                        >
                            {item.task}
                        </Text>
                        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0', // Ensure the background color does not blend with the button
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#5E85ED',
        padding: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    taskText: {
        fontSize: 16,
    },
    taskCompleted: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    deleteText: {
        color: '#FF0000',
    },
});

export default TasksScreen;
