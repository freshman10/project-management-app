import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { IColumn, IColumnPatch, IColumnRequestParams, IGetParams } from '../types/types';
import { RootState } from '../App/state/store';

export const columnApi = createApi({
  reducerPath: 'columnApi',
  tagTypes: ['columns', 'allUserColumns'],
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
    getColumns: build.query<IColumn[], string>({
      query: (id?: string) => ({
        url: `boards/${id}/columns`,
      }),
      providesTags: ['columns'],
      transformResponse: (response: IColumn[]) => {
        return response.sort((a, b) => a.order - b.order);
      },
      keepUnusedDataFor: 0,
    }),
    createColumn: build.mutation<IColumn, IColumnRequestParams>({
      query: ({ boardId, title, order }) => ({
        url: `boards/${boardId}/columns`,
        method: 'POST',
        body: { title, order },
      }),
      invalidatesTags: ['columns', 'allUserColumns'],
    }),
    getColumn: build.query<IColumn, IGetParams>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}`,
      }),
    }),
    updateColumn: build.mutation<IColumn, IColumnRequestParams>({
      query: ({ boardId, columnId, title, order }) => ({
        url: `boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body: { title, order },
      }),
      invalidatesTags: (result) => [
        { type: 'columns', id: result?.columnId },
        { type: 'allUserColumns', id: result?.columnId },
      ],
    }),
    deleteColumn: build.mutation<IColumn, IGetParams>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['columns', 'allUserColumns'],
    }),
    getAllColumnsByUserID: build.query<IColumn[], string>({
      query: (id?: string) => ({
        url: `columnsSet?userId=${id}`,
        method: 'GET',
      }),
      providesTags: ['allUserColumns'],
    }),
    columnsSet: build.mutation<IColumn[], IColumnPatch[]>({
      query: (body) => ({
        url: '/columnsSet',
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useCreateColumnMutation,
  useGetColumnQuery,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
  useGetAllColumnsByUserIDQuery,
  useColumnsSetMutation,
} = columnApi;
