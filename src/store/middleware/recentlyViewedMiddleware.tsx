import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const recentlyViewedMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const state = store.getState() as RootState;
  
  localStorage.setItem(
    'recentlyViewed',
    JSON.stringify(state.recentlyViewed),
  );

  return result;
};
