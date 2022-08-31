import { API_ENDPOINTS } from "../../constants/apiConstants";
import { api } from "./api";
import {FETeam, NewTeamData} from "../../interfaces";
import {buildCommonAddQuery, buildCommonDeleteQuery, buildCommonUpdateQuery} from '../helpers';

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
    }),
    updateTeam: builder.mutation<NewTeamData, Partial<NewTeamData> & Pick<FETeam, '_id'>>({
      query: ({_id, ...patch}) => buildCommonUpdateQuery({_id, ...patch}, targetEndpoint),
    }),
    deleteTeam: builder.mutation<{success: Boolean, _id: string}, string>({
      query: (_id) => buildCommonDeleteQuery(_id, targetEndpoint),
    })
  })
});

export const {
  useGetTeamsQuery,
  useLazyGetTeamsQuery,
  useGetTeamByIdQuery,
  useLazyGetTeamByIdQuery,
  useAddTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation
} = teamApi;
