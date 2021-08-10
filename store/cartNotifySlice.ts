import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface cartNotifySliceState {
  loading?: boolean;
  error?: string;
  success?: boolean;
}

const initialState: { value: any } = { value: {} };

export const cartNotifySlice = createSlice({
  name: "cartNotify",

  initialState,
  reducers: {
    notify: (state, action: PayloadAction<cartNotifySliceState>) => {
      state.value = action.payload;
    },
  },
});

export const { notify } = cartNotifySlice.actions;

export default cartNotifySlice.reducer;
