import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_ENDPOINTS } from '../../constants/apiConstants';
import { prepareHeaders } from '../helpers';

const baseUrl = API_ENDPOINTS.API_BASE;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    prepareHeaders
  }),
  endpoints: () => ({}),
  tagTypes: ['Comments', 'Issues', 'Projects'],
});
