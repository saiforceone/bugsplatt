import { API_ENDPOINTS } from "../../constants/apiConstants";
import {FEProject, FEProjectSearchCriteria, NewProjectData} from "../../interfaces";
import { api } from "./api";
import { buildCommonAddQuery, buildCommonDeleteQuery, buildCommonUpdateQuery, prepareHeaders } from "../helpers";

const targetEndpoint = `${API_ENDPOINTS.PROJECTS}`;

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addProject: builder.mutation<NewProjectData, Partial<NewProjectData>>({
      query: (body) => buildCommonAddQuery(body, targetEndpoint)
    }),
    getProjectWithId: builder.query<FEProject, string>({
      query: (id) => ({
        url: `${targetEndpoint}/${id}`
      })
    }),
    getProjects: builder.query<FEProject, FEProjectSearchCriteria>({
      query: (arg) => {
        console.log('projectAPI args: ', arg);
        return {
          url: `${targetEndpoint}`,
          params: {...arg}
        }
      }
    }),
    updateProject: builder.mutation<FEProject, Partial<FEProject> & Pick<FEProject, "_id">>({
      query: ({_id, ...patch}) => buildCommonUpdateQuery({_id, ...patch}, targetEndpoint),
      transformResponse: (response: {data: FEProject}, meta, arg) => response.data,
      invalidatesTags: ['Projects'],
    }),
    deleteProject: builder.mutation<{ success: boolean; _id: string}, string>({
      query: (_id) => buildCommonDeleteQuery(_id, targetEndpoint)
    })
  })
});

export const {
  useGetProjectWithIdQuery, useLazyGetProjectWithIdQuery,
  useLazyGetProjectsQuery, useGetProjectsQuery, useDeleteProjectMutation,
  useAddProjectMutation
} = projectApi;
