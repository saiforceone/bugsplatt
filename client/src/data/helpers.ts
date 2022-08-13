
import { RootState } from "./store";
import { FetchArgs } from "@reduxjs/toolkit/dist/query";

import { API_ENDPOINTS } from "../constants/apiConstants";
const apiBase = API_ENDPOINTS.API_BASE;

export const prepareHeaders = (headers: Headers, {getState}) => {
  const token = (getState() as RootState).auth.authToken;
  console.log('token from api.ts: ', token);
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }

  return headers;
};

// export const buildUpdateQuery = () => (
//   {
//     query: ({_id, ...patch}) => ({
//       url: `/${_id}`,
//       method: 'PUT',
//       body: patch
//     }),
//     transformResponse: (response: {data: FECommonData}, meta, arg) => response.data,
//     invalidatesTags: ['Issues'],
//     async onQueryStarted(
//       arg,
//       { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
//     ) {},
//     async onCacheEntryAdded(
//       arg,
//       {
//         dispatch,
//         getState,
//         extra,
//         requestId,
//         cacheEntryRemoved,
//         cacheDataLoaded,
//         getCacheEntry,
//       }
//     ) {},
//   }
// )

export const buildCommonAddQuery = (body: object, targetEndpoint: string): FetchArgs => ({
  url: `${targetEndpoint}`,
  method: 'POST',
  body
});

export const buildCommonUpdateQuery = ({_id, ...patch}: {_id: string;}, targetEndpoint: string): FetchArgs => ({
  url: `${targetEndpoint}/${_id}`,
  method: 'PUT',
  body: patch
});

export const buildCommonDeleteQuery = (_id: string, targetEndpoint: string): FetchArgs => ({
  url: `${targetEndpoint}/${_id}`,
  method: 'DELETE',
});
