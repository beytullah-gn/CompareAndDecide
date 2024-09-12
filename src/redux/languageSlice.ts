import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, auth } from '../firebase/firebaseConfig'; 
import { doc, getDoc, setDoc } from 'firebase/firestore';
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
  const user = auth.currentUser;

  if (user) {
    const langDocRef = doc(db, 'users', user.uid);
    const langDoc = await getDoc(langDocRef);

    if (langDoc.exists()) {
      const lang = langDoc.data()?.languageKey;
      return lang ? languages[lang as keyof typeof languages] : languages.tr;
    }
  } else {
    const lang = await AsyncStorage.getItem('selectedLanguage');
    return lang ? languages[lang as keyof typeof languages] : languages.tr;
  }

  return languages.tr;
});

export const saveLanguage = createAsyncThunk('language/saveLanguage', async (langKey: keyof typeof languages) => {
  const user = auth.currentUser;

  if (user) {
    const langDocRef = doc(db, 'users', user.uid);
    await setDoc(langDocRef, { languageKey: langKey }, { merge: true });
  } else {
    await AsyncStorage.setItem('selectedLanguage', langKey);
  }

  return languages[langKey];
});

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<keyof typeof languages>) => {
      state.selectedLanguage = languages[action.payload] || languages.tr;
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
