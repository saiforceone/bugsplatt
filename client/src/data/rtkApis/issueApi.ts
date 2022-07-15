import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "../../constants/apiConstants";
import { FEIssue } from "../../interfaces";
import { buildCommonAddQuery, buildCommonDeleteQuery, prepareHeaders } from "../helpers";

const baseUrl = `${API_ENDPOINTS.API_BASE}${API_ENDPOINTS.ISSUES}`;

export const issueApi = createApi({
  reducerPath: 'issues',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  tagTypes: ['Issues'],
  endpoints: (builder) => ({
    addIssue: builder.mutation<FEIssue, Partial<FEIssue>>({
      query: (body) => buildCommonAddQuery(body),
      invalidatesTags: [{ type: 'Issues', id: 'LIST' }]
    }),
    getIssueWithId: builder.query<FEIssue, string>({
      query: (id) => ({
        url: `/${id}`
      })
    }),
    getIssues: builder.query<FEIssue, void>({
      query: () => ({
        url: '/'
      })
    }),
    updateIssue: builder.mutation<FEIssue, Partial<FEIssue> & Pick<FEIssue, '_id'>>({
      query: ({_id, ...patch}) => ({
        url: `/${_id}`,
        method: 'PUT',
        body: patch
      }),
      transformResponse: (response: {data: FEIssue}, meta, arg) => response.data,
      invalidatesTags: ['Issues'],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {},
    }),
    deleteIssue: builder.mutation<{ success: boolean; _id: string}, string>({
      query: (_id) => buildCommonDeleteQuery(_id)
    })
  })
});

export const {
  useGetIssueWithIdQuery,
  useLazyGetIssueWithIdQuery,
  useGetIssuesQuery,
  useLazyGetIssuesQuery,
  useUpdateIssueMutation,
  useDeleteIssueMutation,
  useAddIssueMutation,
} = issueApi;
