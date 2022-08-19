import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { FECommonUserData } from "../../interfaces";

interface CurrentUserState {
  currentUser?: FECommonUserData;
  isFetching: boolean;
}

const initialState: CurrentUserState = {
  currentUser: undefined,
  isFetching: false
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<FECommonUserData>) => {
      state.currentUser = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    }
  }
});

export const { setCurrentUser, setIsFetching } = currentUserSlice.actions;

export default currentUserSlice.reducer;
