import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FEComment } from '../../interfaces';
import { API_ENDPOINTS } from '../../constants/apiConstants';
import { prepareHeaders } from '../helpers';

export const commentApi = createApi({

  reducerPath: 'comments',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${API_ENDPOINTS.API_BASE}${API_ENDPOINTS.COMMENTS}` ,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getCommentById: builder.query<FEComment, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET'
      })
    }),
    getComments: builder.query<FEComment, void>({
      query: () => ({ 
        url: `/`,
        method: 'GET'
      })
    })
  })
});

export const {useGetCommentsQuery, useLazyGetCommentsQuery, useGetCommentByIdQuery, useLazyGetCommentByIdQuery} = commentApi;
