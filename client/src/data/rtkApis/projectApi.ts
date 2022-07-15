import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "../../constants/apiConstants";
import { FEProject } from "../../interfaces";
import { buildCommonAddQuery, buildCommonDeleteQuery, prepareHeaders } from "../helpers";

const baseUrl = `${API_ENDPOINTS.API_BASE}${API_ENDPOINTS.PROJECTS}`;

export const projectApi = createApi({
  reducerPath: 'projects',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    addProject: builder.mutation<FEProject, Partial<FEProject>>({
      query: (body) => buildCommonAddQuery(body)
    }),
    getProjectWithId: builder.query<FEProject, string>({
      query: (id) => ({
        url: `/${id}`
      })
    }),
    getProjects: builder.query<FEProject, void>({
      query: () => ({
        url: '/'
      })
    }),
    // TODO: IMPLEMENT UPDATE Query
    deleteProject: builder.mutation<{ success: boolean; _id: string}, string>({
      query: (_id) => buildCommonDeleteQuery(_id)
    })
  })
});

export const {
  useGetProjectWithIdQuery, useLazyGetProjectWithIdQuery,
  useLazyGetProjectsQuery, useGetProjectsQuery, useDeleteProjectMutation,
  useAddProjectMutation
} = projectApi;
