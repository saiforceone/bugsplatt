
import { RootState } from "./store";

export const prepareHeaders = (headers: Headers, {getState}) => {
  const token = (getState() as RootState).auth.authToken;
  console.log('token from api.ts: ', token);
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  
  return headers;
};
