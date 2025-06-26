import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { cartLocStorMiddleware } from './middleware/cartMiddleware';
import { favouritesLocStorMiddleWare } from './middleware/favouritesMiddleware';
import { themeMiddleware } from './middleware/themeMiddleware';
import { compareLocStorMiddleware } from './middleware/compareMiddleware';
import { recentlyViewedMiddleware } from './middleware/recentlyViewedMiddleware';
import cartReducer from './features/cartProducts';
import favouritesReducer from './features/favouriteProducts';
import themeReducer from './features/theme'
import compareReducer from './features/compareProducts';
import recentlyViewedReducer from './features/recentlyViewedProducts';

export const store = configureStore({
  reducer: {
    cartProducts: cartReducer,
    favouriteProducts: favouritesReducer,
    theme: themeReducer,
    compareProducts: compareReducer,
    recentlyViewed: recentlyViewedReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(
      cartLocStorMiddleware,
      favouritesLocStorMiddleWare,
      themeMiddleware,
      compareLocStorMiddleware,
      recentlyViewedMiddleware,
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
