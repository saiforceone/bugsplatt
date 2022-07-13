import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "../../constants/apiConstants";
import { FEIssue } from "../../interfaces";
import { prepareHeaders } from "../helpers";

const baseUrl = `${API_ENDPOINTS.API_BASE}${API_ENDPOINTS.ISSUES}`;

export const issueApi = createApi({
  reducerPath: 'issues',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
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
  })
});

export const {
  useGetIssueWithIdQuery,
  useLazyGetIssueWithIdQuery,
  useGetIssuesQuery,
  useLazyGetIssuesQuery
} = issueApi;
