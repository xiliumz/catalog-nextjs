import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CurrentUser {
  name?: string;
  email?: string;
  username?: string;
}

interface initialStateProps extends CurrentUser {
  session?: string;
}

const initialState: initialStateProps = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<string>) => {
      state.session = action.payload;
    },
    delSession: (state) => {
      state.session = '';
    },
    setUser: (state, action: PayloadAction<CurrentUser>) => {
      if (action.payload.name) state.name = action.payload.name;
      if (action.payload.email) state.email = action.payload.email;
      if (action.payload.username) state.username = action.payload.username;
    },
  },
});

export const { delSession, setSession, setUser } = userSlice.actions;
export default userSlice.reducer;
