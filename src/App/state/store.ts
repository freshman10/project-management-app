import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth.api';
import userSlice from '../../features/authSlice';
import { columnApi } from '../../api/column.api';
import { userApi } from '../../api/user.api';

export const store = configureStore({
  reducer: {
    userState: userSlice,
    [authApi.reducerPath]: authApi.reducer,
    [columnApi.reducerPath]: columnApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, columnApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
