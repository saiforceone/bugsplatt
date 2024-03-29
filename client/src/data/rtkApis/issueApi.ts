import { API_ENDPOINTS } from "../../constants/apiConstants";
import {FEIssue, FEIssueSearchCriteria, NewIssueData} from "../../interfaces";
import { api } from "./api";
import { buildCommonAddQuery, buildCommonDeleteQuery, buildCommonUpdateQuery } from "../helpers";

const targetEndpoint = `${API_ENDPOINTS.ISSUES}`;

export const issueApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addIssue: builder.mutation<NewIssueData, Partial<NewIssueData>>({
      query: (body) => buildCommonAddQuery(body, targetEndpoint),
      invalidatesTags: [{ type: 'Issues', id: 'LIST' }]
    }),
    getIssueWithId: builder.query<FEIssue, string>({
      query: (id) => ({
        url: `${targetEndpoint}/${id}`
      })
    }),
    getIssues: builder.query<FEIssue, FEIssueSearchCriteria>({
      query: (arg) => ({
        url: `${targetEndpoint}`,
        params: {...arg}
      })
    }),
    updateIssue: builder.mutation<NewIssueData, Partial<NewIssueData> & Pick<FEIssue, '_id'>>({
      query: ({_id, ...patch}) => buildCommonUpdateQuery({_id, ...patch}, targetEndpoint),
      // transformResponse: (response: {data: FEIssue}, meta, arg) => response.data,
      invalidatesTags: ['Issues'],
    }),
    deleteIssue: builder.mutation<{ success: boolean; _id: string}, string>({
      query: (_id) => buildCommonDeleteQuery(_id, targetEndpoint)
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
