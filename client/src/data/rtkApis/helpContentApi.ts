import { api } from "./api";
import { API_ENDPOINTS } from "../../constants/apiConstants";
import { FEHelpContent } from "../../interfaces";

const targetUrl = API_ENDPOINTS.HELP_CONTENT;

export const helpContentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHelpContent: builder.query<FEHelpContent, void>({
      query: () => ({
        url: targetUrl
      })
    })
  })
});

export const {
  useGetAllHelpContentQuery,
  useLazyGetAllHelpContentQuery
} = helpContentApi;
