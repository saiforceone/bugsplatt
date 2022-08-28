import { API_ENDPOINTS } from "../../constants/apiConstants";
import { FECommonUserData } from "../../interfaces";
import { api } from "./api";

const targetEndpoint = API_ENDPOINTS.USERS;

const userProfileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableUsers: builder.query<FECommonUserData, void>({
      query: () => ({
        url: `${targetEndpoint}/available-users`
      })
    })
  }),
});

export const {
  useGetAvailableUsersQuery,
  useLazyGetAvailableUsersQuery
} = userProfileApi;