import { IUser, IUserSavingData, IUserState } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const { token, login } = JSON.parse(localStorage.getItem('credentials') || '{}');

const initialState: IUserState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  login: login,
  token: token,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.token = null;
    },
    setUserInfo: (state, action: PayloadAction<IUserSavingData>) => {
      localStorage.setItem(
        'credentials',
        JSON.stringify({ token: action.payload.token, login: action.payload.login })
      );
      state.token = action.payload.token;
      state.login = action.payload.login;
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUserInfo, setUser } = userSlice.actions;
