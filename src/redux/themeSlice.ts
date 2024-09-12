import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, auth } from '../firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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
  const user = auth.currentUser;
  
  console.log('Current user:', user); 
  
  if (user) {

    const themeDocRef = doc(db, 'users', user.uid);
    const themeDoc = await getDoc(themeDocRef);

    if (themeDoc.exists()) {
      const themeKey = themeDoc.data()?.themeKey;
      console.log('Firestore themeKey:', themeKey); 
      return themeKey ? themePalettes[themeKey as keyof typeof themePalettes] : Palette1;
    }
  } else {
    const themeKey = await AsyncStorage.getItem('selectedTheme');
    console.log('AsyncStorage themeKey:', themeKey);  
    return themeKey ? themePalettes[themeKey as keyof typeof themePalettes] : Palette1;
  }

  return Palette1;
});

export const saveTheme = createAsyncThunk('theme/saveTheme', async (themeKey: keyof typeof themePalettes) => {
  const user = auth.currentUser;

  if (user) {
    const themeDocRef = doc(db, 'users', user.uid);
    await setDoc(themeDocRef, { themeKey }, { merge: true });
  } else {
    await AsyncStorage.setItem('selectedTheme', themeKey);
  }

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
