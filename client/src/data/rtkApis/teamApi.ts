import { API_ENDPOINTS } from "../../constants/apiConstants";
import { api } from "./api";
import {FETeam, NewTeamData} from "../../interfaces";
import {buildCommonAddQuery} from '../helpers';

const targetEndpoint = `${API_ENDPOINTS.TEAMS}`;

export const teamApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addTeam: builder.mutation<NewTeamData, Partial<NewTeamData>>({
      query: (body) => buildCommonAddQuery(body, targetEndpoint)
    }),
    getTeams: builder.query<FETeam, void>({
      query: () => ({
        url: `${targetEndpoint}`
      })
    })
  })
});

export const {
  useGetTeamsQuery,
  useLazyGetTeamsQuery,
  useAddTeamMutation,
} = teamApi;
