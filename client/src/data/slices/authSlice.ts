import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  authToken: string;
}

const initialState: AuthState = {
  authToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload
    }
  }
});

export const { setAuthToken } = authSlice.actions;

export default authSlice.reducer;
