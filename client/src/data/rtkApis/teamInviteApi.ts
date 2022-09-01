import {api} from './api';
import {API_ENDPOINTS} from '../../constants/apiConstants';
import {buildCommonAddQuery, buildCommonUpdateQuery} from '../helpers';
import {FETeamInvite, NewTeamInviteData} from '../../interfaces';

const targetEndpoint = API_ENDPOINTS.TEAM_INVITES;

export const teamInviteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createInvite: builder.mutation<NewTeamInviteData, Partial<NewTeamInviteData>>({
      query: (body) => buildCommonAddQuery(body, targetEndpoint)
    }),
    getInvites: builder.query<FETeamInvite, void>({
      query: () => ({
        url: `${targetEndpoint}`
      }),
    }),
    getInvitesForTeam: builder.query<FETeamInvite, string>({
      query: (teamId: string) => ({
        url: `${targetEndpoint}/invites-for-team?teamId=${teamId}`
      }),
    }),
    acceptInvite: builder.mutation({
      query: ({_id, ...body}) => ({
        url: `${targetEndpoint}/${_id}/accept-invite`,
        method: 'PUT',
        body
      }),
    }),
    declineInvite: builder.mutation({
      query: ({_id}) => ({
        url: `${targetEndpoint}/${_id}/decline-invite`,
        method: 'PUT',
        body: {
          action: 'decline-invite'
        }
      })
    })
  }),
});

export const {
  useCreateInviteMutation,
  useAcceptInviteMutation,
  useDeclineInviteMutation,
  useGetInvitesQuery,
  useLazyGetInvitesQuery,
  useGetInvitesForTeamQuery,
  useLazyGetInvitesForTeamQuery
} = teamInviteApi;
