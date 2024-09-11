import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Task = {
  id: string;
  task: string;
  completed: boolean;
};

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [
    { id: '1', task: 'Buy Milk', completed: false },
    { id: '2', task: 'Walk the Dog', completed: false },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      state.tasks.push({
        id: Date.now().toString(),
        task: action.payload,
        completed: false,
      });
    },
    toggleTaskCompletion(state, action: PayloadAction<string>) {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTask, toggleTaskCompletion, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
