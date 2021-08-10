import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductImageData, ShoesData } from "../interfaces";

interface cartSliceState {
  _id?: string;
  title?: string;
  description?: string;
  price?: number;
  images?: ProductImageData[];
  category?: string;
  checked?: boolean;
  count?: number;
}

const initialState: { value: cartSliceState[] } = { value: [] };

export const cartSlice = createSlice({
  name: "cart",

  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartSliceState>) => {
      const isExists = state.value.find((el) => el._id === action.payload._id);

      const isExistsIndex = state.value.findIndex(
        (el) => el._id === action.payload._id
      );

      if (isExists) {
        isExists.count = isExists.count + action.payload.count;
        const before = state.value.slice(0, isExistsIndex);
        const after = state.value.slice(
          isExistsIndex + 1,
          state.value.length + 1
        );
        const resArr = [...before, isExists, ...after];

        state.value = resArr;
      }

      if (!isExists) {
        state.value = [...state.value, action.payload];
      }
    },
    incCartItem: (state, action: PayloadAction<string>) => {
      const isExists = state.value.find((el) => el._id === action.payload);
      const isExistsIndex = state.value.findIndex(
        (el) => el._id === action.payload
      );

      if (isExists) {
        isExists.count = isExists.count + 1;
        const before = state.value.slice(0, isExistsIndex);
        const after = state.value.slice(
          isExistsIndex + 1,
          state.value.length + 1
        );
        const resArr = [...before, isExists, ...after];

        state.value = resArr;
      }
    },
    decCartItem: (state, action: PayloadAction<string>) => {
      const isExists = state.value.find((el) => el._id === action.payload);
      const isExistsIndex = state.value.findIndex(
        (el) => el._id === action.payload
      );

      if (isExists) {
        let resArr: [] | cartSliceState[];
        const before = state.value.slice(0, isExistsIndex);
        const after = state.value.slice(
          isExistsIndex + 1,
          state.value.length + 1
        );

        if (isExists.count === 1) {
          resArr = [...before, ...after];
        }

        if (isExists.count > 1) {
          isExists.count = isExists.count - 1;
          resArr = [...before, isExists, ...after];
        }

        state.value = resArr;
      }
    },
    clearCart: (state) => {
      state.value = [];
    },
  },
});

export const { addToCart, incCartItem, decCartItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
