// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authslice';
import tasksReducer from '../redux/todoSlice';
import storage from '@react-native-async-storage/async-storage'


const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
