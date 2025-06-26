import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const favouritesLocStorMiddleWare: Middleware = store => next => action => {
  const result = next(action);
  const state = store.getState() as RootState;
  
  localStorage.setItem(
    'favouriteProducts',
    JSON.stringify(state.favouriteProducts),
  );

  return result;
};
