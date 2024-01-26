import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialStateProps {
  session: string;
  name: null | string;
  email: null | string;
}

const initialState: initialStateProps = {
  session: '',
  name: null,
  email: null,
};

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
  },
});

export const { delSession, setSession } = userSlice.actions;
export default userSlice.reducer;
