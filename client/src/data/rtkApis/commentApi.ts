import { FEComment } from "../../interfaces";
import { api } from "./api";
import { buildCommonAddQuery, buildCommonDeleteQuery } from "../helpers";
import { API_ENDPOINTS } from "../../constants/apiConstants";

const targetEndpoint = API_ENDPOINTS.COMMENTS;

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation<FEComment, Partial<FEComment>>({
      query: (body) => buildCommonAddQuery(body, targetEndpoint),
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
    getCommentById: builder.query<FEComment, string>({
      query: (id) => ({
        url: `${targetEndpoint}/${id}`,
        method: "GET",
      }),
    }),
    getComments: builder.query<FEComment, string>({
      query: (associatedIssue?: string) => ({
        url: `${targetEndpoint}${
          associatedIssue ? `?associatedIssue=${associatedIssue}` : ""
        }`,
        method: "GET",
      }),
    }),
    deleteComment: builder.mutation<{ success: boolean; _id: string }, string>({
      query: (_id) => buildCommonDeleteQuery(_id, targetEndpoint),
    }),
  }),
});

export const {
  useAddCommentMutation,
  useGetCommentsQuery,
  useLazyGetCommentsQuery,
  useGetCommentByIdQuery,
  useLazyGetCommentByIdQuery,
} = commentApi;
