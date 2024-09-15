import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  userId: string | null;  // Firestore'daki document ID
}

const initialState: UserState = {
  uid: null,
  email: null,
  displayName: null,
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState | null>) => {
      return action.payload || initialState;
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
  },
});

export const { setUser, setUserId } = userSlice.actions;
export default userSlice.reducer;
