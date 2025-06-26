import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShortProductWithDetails } from "../../types/FullProduct";


const initialState: ShortProductWithDetails[] = JSON.parse(
  localStorage.getItem('compareProducts') || '[]',
);

export const compareProductsSlice = createSlice({
  name: 'compareProducts',
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<ShortProductWithDetails>) => {
      state.push(action.payload);
    },
    removeFromCompare: (state, action: PayloadAction<string>) => {
      return state.filter(stateItem => stateItem.itemId !== action.payload);
    },
  },
})

export default compareProductsSlice.reducer;
export const {addToCompare, removeFromCompare} = compareProductsSlice.actions;
