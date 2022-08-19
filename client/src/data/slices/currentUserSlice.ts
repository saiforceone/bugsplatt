import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { FECommonUserData } from "../../interfaces";

interface CurrentUserState {
  currentUser?: FECommonUserData;
}

const initialState: CurrentUserState = {
  currentUser: undefined
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<FECommonUserData>) => {
      state.currentUser = action.payload;
    }
  }
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
