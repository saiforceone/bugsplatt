import { API_ENDPOINTS } from "../../constants/apiConstants";
import { FEReportedProblem, FEReportedProbSearchCriteria, NewReportedProbData } from "../../interfaces";
import { buildCommonAddQuery } from "../helpers";
import { api } from "./api";

const targetEndpoint = API_ENDPOINTS.REPORTED_PROBLEMS;

export const reportedProblemAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create
    addReportedProblem: builder.mutation<NewReportedProbData, Partial<NewReportedProbData>>({
      query: body => buildCommonAddQuery(body, targetEndpoint)
    }),
    // Read
    getProblems: builder.query<FEReportedProblem, FEReportedProbSearchCriteria>({
      query: (arg) => ({
        url: `${targetEndpoint}`,
        params: {...arg}
      })
    })
  })
});

export const {
  useAddReportedProblemMutation,
  useLazyGetProblemsQuery,
} = reportedProblemAPI;