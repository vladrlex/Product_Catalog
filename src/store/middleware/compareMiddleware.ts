import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const compareLocStorMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const state = store.getState() as RootState;

  localStorage.setItem('compareProducts', JSON.stringify(state.compareProducts));

  return result;
};
