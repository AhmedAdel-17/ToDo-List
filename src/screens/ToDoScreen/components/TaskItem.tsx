// components/TaskItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './TaskItem.styles';
import colors from '../../../utils/colors';

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    completed: boolean;
  };
  toggleTaskCompletion: (taskId: string, isCompleted: boolean) => void;
  deleteTask: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTaskCompletion, deleteTask }) => {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTaskCompletion(task.id, task.completed)}>
        <Icon
          name={task.completed ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={task.completed ? "#fff" : "#fff"}
        />
      </TouchableOpacity>
      <Text style={[styles.taskText, task.completed && styles.completedTask]}>
        {task.title}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(task.id)}>
        <Icon name="trash-bin" size={24} color= {colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
