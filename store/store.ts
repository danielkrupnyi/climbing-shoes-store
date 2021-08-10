import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import notifySlice from "./notifySlice";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import cartNotifySlice from "./cartNotifySlice";
import ordersSlice from "./ordersSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  cart: cartSlice,
  auth: authSlice,
});

const persist = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: { persist, notifySlice, cartNotifySlice, ordersSlice },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
