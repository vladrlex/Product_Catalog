import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShortProduct } from '../../types/ShortProduct';

const initialState: ShortProduct[] = JSON.parse(
  localStorage.getItem('recentlyViewed') || '[]',
);

export const recentlyViewedProductsSlice = createSlice({
  name: 'recentlyViewed',
  initialState,
  reducers: {
    addToRecentlyViewed: (state, action: PayloadAction<ShortProduct>) => {
      const index = state.findIndex(prod => prod.itemId === action.payload.itemId);
      if (index !== -1) {
        state.splice(index, 1);
      }
      if (state.length < 12) {
        state.unshift(action.payload);
      } else if (state.length === 12) {
        state.pop();
        state.unshift(action.payload);
      }
    }
  },
});

export default recentlyViewedProductsSlice.reducer;
export const { addToRecentlyViewed } = recentlyViewedProductsSlice.actions;
