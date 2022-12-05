import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'App/state/store';
import { BoardConfig } from 'types/types';
import { BASE_URL } from '../constants/constants';

export const searchApi = createApi({
  reducerPath: 'searchApi',
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
    getColumnsByUserID: build.query<BoardConfig[], void>({
      query: (id) => ({
        url: `/columnsSet?userId=${id}`,
      }),
      keepUnusedDataFor: 1,
    }),
  }),
});

export const { useGetColumnsByUserIDQuery } = searchApi;
