import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShortProduct } from '../../types/ShortProduct';

const initialState: ShortProduct[] = JSON.parse(
  localStorage.getItem('favouriteProducts') || '[]',
);

export const favouritesProductsSlice = createSlice({
  name: 'favouriteProducts',
  initialState,
  reducers: {
    addToFav: (state, action: PayloadAction<ShortProduct>) => {
      state.push(action.payload);
    },
    removeFromFav: (state, action: PayloadAction<string>) => {
      return state.filter(stateItem => stateItem.itemId !== action.payload);
    },
  },
});

export default favouritesProductsSlice.reducer;
export const { addToFav, removeFromFav } =
favouritesProductsSlice.actions;