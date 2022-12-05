import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import {
  ISignInFormFields,
  ISignInResponse,
  IUser,
  IUserAuthInfo,
  IUserSavingData,
} from '../types/types';
import { setUser, setUserInfo } from '../features/authSlice';
import { userApi } from './user.api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    signUp: build.mutation<IUser, IUserAuthInfo>({
      query: (body: IUserAuthInfo) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
    signIn: build.mutation<IUserSavingData, ISignInFormFields>({
      query: (body: ISignInFormFields) => ({
        url: '/auth/signin',
        method: 'POST',
        body,
      }),
      transformResponse(response: ISignInResponse, _, arg: ISignInFormFields) {
        return { token: response.token, login: arg.login };
      },
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled.then((data) => dispatch(setUserInfo(data.data)));
          const { data: users } = await dispatch(userApi.endpoints.getUsers.initiate());
          const { login } = body;
          const searchUser = users?.find((user: IUser) => user.login === login);

          if (searchUser) {
            dispatch(setUser(searchUser));
          }
        } catch (error) {
          throw new Error();
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
