import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'App/state/store';
import { BoardConfig } from 'types/types';
import { BASE_URL } from '../constants/constants';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  tagTypes: ['boards'],
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
    getBoard: build.query<BoardConfig, string>({
      query: (boardId: string) => ({
        url: `/boards/${boardId}`,
      }),
    }),
    getBoards: build.query<BoardConfig[], void>({
      query: () => ({
        url: '/boards',
      }),
      providesTags: ['boards'],
      keepUnusedDataFor: 1,
    }),
    createBoard: build.mutation<BoardConfig, BoardConfig>({
      query: (body) => ({
        url: '/boards',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['boards'],
    }),
    deleteBoard: build.mutation<BoardConfig, unknown>({
      query: (board_id: string) => ({
        url: `/boards/${board_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['boards'],
    }),
    updateBoard: build.mutation<BoardConfig, BoardConfig>({
      query: (body: BoardConfig) => {
        const data = { ...body };
        delete data._id;
        return {
          url: `/boards/${body._id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (result) => [{ type: 'boards', _id: result?._id }],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetBoardQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} = mainApi;
