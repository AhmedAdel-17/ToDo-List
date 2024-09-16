import { createSlice } from '@reduxjs/toolkit';
import { getLocales } from 'react-native-localize';

type LanguageState = {
  language: string;
};

const defaultLanguage = getLocales()[0]?.languageCode || 'en';

const initialState: LanguageState = {
  language: defaultLanguage, // Set the default language based on device
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
