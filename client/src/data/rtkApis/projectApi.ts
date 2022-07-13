import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "../../constants/apiConstants";
import { FEProject } from "../../interfaces";
import { prepareHeaders } from "../helpers";

const baseUrl = `${API_ENDPOINTS.API_BASE}${API_ENDPOINTS.PROJECTS}`;

export const projectApi = createApi({
  reducerPath: 'projects',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getProjectWithId: builder.query<FEProject, string>({
      query: (id) => ({
        url: `/${id}`
      })
    }),
    getProjects: builder.query<FEProject, void>({
      query: () => ({
        url: '/'
      })
    })
  })
});

export const {
  useGetProjectWithIdQuery, useLazyGetProjectWithIdQuery,
  useLazyGetProjectsQuery, useGetProjectsQuery
} = projectApi;
