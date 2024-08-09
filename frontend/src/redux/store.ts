import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { pasteReducer } from "./slices/paste.slice";

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector as <T>(
  selector: (state: RootState) => T
) => T;
