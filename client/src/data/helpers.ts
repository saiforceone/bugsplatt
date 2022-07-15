
import { RootState } from "./store";
import { FECommonData } from "../interfaces";
import { FetchArgs } from "@reduxjs/toolkit/dist/query";

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

export const buildCommonAddQuery = (body: object): FetchArgs => ({
  url: '/',
  method: 'POST',
  body
});

export const buildCommonDeleteQuery = (_id: string): FetchArgs => ({
  url: `/${_id}`,
  method: 'DELETE',
});
