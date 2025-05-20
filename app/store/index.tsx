import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import tokenReducer from "./token/tokenReducer";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
