import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../redux/authslice'; // Ensure the path to authSlice is correct
import tasksReducer from '../redux/todoSlice';
import languageReducer from '../redux/languageSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'language'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  language: languageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export default store;
