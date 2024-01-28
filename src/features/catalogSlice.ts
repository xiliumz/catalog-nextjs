import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialStateProps {
  session: null | string;
  name: null | string;
  email: null | string;
  username: null | string;
}

const initialState: initialStateProps = {
  session: null,
  name: null,
  email: null,
  username: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<string>) => {
      state.session = action.payload;
    },
    delSession: (state) => {
      state.session = null;
    },
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
  },
});

export const { delSession, setSession, setUser } = userSlice.actions;
export default userSlice.reducer;
