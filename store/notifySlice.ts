import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface notifySliceState {
  loading?: boolean;
  error?: string;
  success?: boolean;
}

const initialState: { value: any } = { value: {} };

export const notifySlice = createSlice({
  name: "notify",

  initialState,
  reducers: {
    notify: (state, action: PayloadAction<notifySliceState>) => {
      state.value = action.payload;
    },
  },
});

export const { notify } = notifySlice.actions;

export default notifySlice.reducer;
