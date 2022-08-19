import {AnyAction, Dispatch} from '@reduxjs/toolkit';
import APIUtils from '../../utils/APIUtils';
import {setCurrentUser, setIsFetching} from '../slices/currentUserSlice';
import {API_ENDPOINTS} from '../../constants/apiConstants';
import {FECommonUserData} from '../../interfaces';

export const fetchCurrentUserAction = async (dispatch: Dispatch<AnyAction>, token: string) => {
  dispatch(setIsFetching(true));

  const targetUrl = `${API_ENDPOINTS.API_BASE}${API_ENDPOINTS.USERS}`;

  const {data, success} = await APIUtils.execFetch(targetUrl, token);

  dispatch(setIsFetching(false));

  if (!success) return;
  dispatch(setCurrentUser(data as FECommonUserData));
};
