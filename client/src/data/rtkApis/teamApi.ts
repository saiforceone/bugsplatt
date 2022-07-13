import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "../helpers"; 
import { API_ENDPOINTS } from "../../constants/apiConstants";
import { FETeam } from "../../interfaces";

const baseUrl = `${API_ENDPOINTS.API_BASE}${API_ENDPOINTS.TEAMS}`;

export const teamApi = createApi({
  reducerPath: 'teams',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    getTeams: builder.query<FETeam, void>({
      query: () => ({
        url: '/'
      })
    })
  })
});

export const {
  useLazyGetTeamsQuery,
} = teamApi;
