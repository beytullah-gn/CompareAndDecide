import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Palette1 from '../assets/palettes/Palette1';
import Palette2 from '../assets/palettes/Palette2';

interface ThemeState {
  selectedTheme: typeof Palette1 | typeof Palette2;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const themePalettes = {
  Palette1,
  Palette2,
};

const initialState: ThemeState = {
  selectedTheme: Palette1,
  status: 'idle',
};

export const loadTheme = createAsyncThunk('theme/loadTheme', async () => {
  const themeKey = await AsyncStorage.getItem('selectedTheme');
  return themeKey ? themePalettes[themeKey as keyof typeof themePalettes] : Palette1;
});

export const saveTheme = createAsyncThunk('theme/saveTheme', async (themeKey: keyof typeof themePalettes) => {
  await AsyncStorage.setItem('selectedTheme', themeKey);
  return themePalettes[themeKey];
});

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<keyof typeof themePalettes>) => {
      state.selectedTheme = themePalettes[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTheme.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadTheme.fulfilled, (state, action) => {
        state.selectedTheme = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loadTheme.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(saveTheme.fulfilled, (state, action) => {
        state.selectedTheme = action.payload;
      });
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
