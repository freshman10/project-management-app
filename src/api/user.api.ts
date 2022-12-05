import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { RootState } from '../App/state/store';
import { FullUserData, ISignInFormFields, IUser, IUserSavingData } from '../types/types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => ({
        url: '/users',
      }),
      keepUnusedDataFor: 0,
    }),
    updateUser: build.mutation<IUser, FullUserData>({
      query: ({ _id, name, login, password }: FullUserData) => ({
        url: `/users/${_id}`,
        method: 'PUT',
        body: { name, login, password },
      }),
    }),
    deleteUser: build.mutation<IUser, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    checkUserPassword: build.mutation<IUserSavingData, ISignInFormFields>({
      query: (body: ISignInFormFields) => ({
        url: '/auth/signin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCheckUserPasswordMutation,
} = userApi;
