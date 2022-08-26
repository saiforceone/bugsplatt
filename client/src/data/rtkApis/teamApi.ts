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
    getTeamById: builder.query<FETeam, string>({
      query: (id) => ({
        url: `${targetEndpoint}/${id}`
      })
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
  useGetTeamByIdQuery,
  useLazyGetTeamByIdQuery,
  useAddTeamMutation,
} = teamApi;
