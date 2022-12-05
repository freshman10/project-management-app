import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeSlice } from 'types/types';

const initialState: ThemeSlice = {
  theme: localStorage.getItem('theme'),
};

export const themeSlice = createSlice({
  initialState,
  name: 'themeSlice',
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;
