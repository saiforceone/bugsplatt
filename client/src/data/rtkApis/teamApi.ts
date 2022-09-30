import { API_ENDPOINTS } from "../../constants/apiConstants";
import { api } from "./api";
import {FECommonUserData, FETeam, NewTeamData} from "../../interfaces";
import {buildCommonAddQuery, buildCommonDeleteQuery, buildCommonUpdateQuery} from '../helpers';

const targetEndpoint = `${API_ENDPOINTS.TEAMS}`;

export const teamApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addTeam: builder.mutation<NewTeamData, Partial<NewTeamData>>({
      query: (body) => buildCommonAddQuery(body, targetEndpoint)
    }),
    getAvailableUsers: builder.query<FECommonUserData, string>({
      query: (id) => ({
        url: `${targetEndpoint}/${id}/available-users`
      })
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
    leaveTeam: builder.mutation<string>({
      query: ({_id, ...patch}) => ({
        url: `${targetEndpoint}/${_id}/leave-team`,
        method: 'POST',
        body: patch,
      }),
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
  useDeleteTeamMutation,
  useLazyGetAvailableUsersQuery,
  useLeaveTeamMutation,
} = teamApi;
