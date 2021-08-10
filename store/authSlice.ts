import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authSliceState {
  token?: string;
  user?: string;
}

const initialState: { value: any } = { value: {} };

export const notifySlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    auth: (state, action: PayloadAction<authSliceState>) => {
      state.value = action.payload;
    },
  },
});

export const { auth } = notifySlice.actions;

export default notifySlice.reducer;
