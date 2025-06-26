import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = 'light' | 'dark';

interface ThemeState {
  theme: InitialStateType;
}

const initialState: ThemeState = {
  theme: localStorage.getItem('theme') as InitialStateType || 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state: ThemeState) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export default themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;