import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductImageData, ShoesData } from "../interfaces";

// interface orderSliceState {
//   _id?: string;
//   title?: string;
//   description?: string;
//   price?: number;
//   images?: ProductImageData[];
//   category?: string;
//   checked?: boolean;
//   count?: number;
// }

const initialState: { value: any } = { value: [] };

export const cartSlice = createSlice({
  name: "orders",

  initialState,
  reducers: {
    addOrders: (state, action: PayloadAction<any>) => {
      state.value = [...action.payload];
    },

    clearOrders: (state) => {
      state.value = [];
    },
  },
});

export const { addOrders, clearOrders } = cartSlice.actions;

export default cartSlice.reducer;
