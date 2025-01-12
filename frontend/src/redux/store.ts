import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;