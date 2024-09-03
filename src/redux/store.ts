// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import tasksReducer from './todoSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
