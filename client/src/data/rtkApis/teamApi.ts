import { API_ENDPOINTS } from "../../constants/apiConstants";
import { api } from "./api";
import { FETeam } from "../../interfaces";

const targetEndpoint = `${API_ENDPOINTS.TEAMS}`;

export const teamApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query<FETeam, void>({
      query: () => ({
        url: `${targetEndpoint}`
      })
    })
  })
});

export const {
  useLazyGetTeamsQuery,
} = teamApi;
