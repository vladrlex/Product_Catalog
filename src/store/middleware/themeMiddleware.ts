import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const themeMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const state = store.getState() as RootState;
  localStorage.setItem('theme', state.theme.theme);

  return result;
}