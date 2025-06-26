import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShortProduct } from '../../types/ShortProduct';

const initialState: ShortProduct[] = JSON.parse(
  localStorage.getItem('cartProducts') || '[]',
);

export const cartProductsSlice = createSlice({
  name: 'cartProducts',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ShortProduct>) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      return state.filter(stateItem => stateItem.itemId !== action.payload);
    },
    removeAllFromCart: () => {
      return [];
    },
  },
});

export default cartProductsSlice.reducer;
export const { addToCart, removeFromCart, removeAllFromCart } =
  cartProductsSlice.actions;
