import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const cartLocStorMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const state = store.getState() as RootState;

  localStorage.setItem('cartProducts', JSON.stringify(state.cartProducts));

  return result;
};
