import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tr from '../assets/languages/tr';
import en from '../assets/languages/en';

const languages = {
  tr,
  en,
};

interface LanguageState {
  selectedLanguage: typeof tr;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: LanguageState = {
  selectedLanguage: languages.tr,
  status: 'idle',
};

export const loadLanguage = createAsyncThunk('language/loadLanguage', async () => {
  const lang = await AsyncStorage.getItem('selectedLanguage');
  return lang ? languages[lang as keyof typeof languages] : languages.tr;
});

export const saveLanguage = createAsyncThunk('language/saveLanguage', async (lang: string) => {
  await AsyncStorage.setItem('selectedLanguage', lang);
  return languages[lang as keyof typeof languages] || languages.tr;
});

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.selectedLanguage = languages[action.payload as keyof typeof languages] || languages.tr;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLanguage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadLanguage.fulfilled, (state, action) => {
        state.selectedLanguage = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loadLanguage.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(saveLanguage.fulfilled, (state, action) => {
        state.selectedLanguage = action.payload;
      });
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
