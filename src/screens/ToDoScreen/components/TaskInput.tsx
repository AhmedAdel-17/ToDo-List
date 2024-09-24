// components/TaskInput.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './TaskInput.styles';
import { useTranslation } from 'react-i18next';
import colors from '../../../utils/colors';

interface TaskInputProps {
  newTask: string;
  setNewTask: (task: string) => void;
  addTask: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ newTask, setNewTask, addTask }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={t('new_task')}
        placeholderTextColor={colors.white}
        value={newTask}
        onChangeText={setNewTask}
        keyboardAppearance='default'
        keyboardType='default'
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Icon name="add" size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default TaskInput;
