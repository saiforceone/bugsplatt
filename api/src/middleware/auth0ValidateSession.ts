import {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import { IUserProfile } from '../resources/interfaces/UserProfile.interface';
import UserProfileModel from '../resources/models/UserProfile.model';
import { ROUTER_RESPONSE_CODES } from '../routers/Base.router';
import APIUtils from '../utils/APIUtils';

interface Auth0UserData {
  sub: string;
  nickname: string;
  name: string;
  picture: string;
  email: string;
}

export const auth0ValidateSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth0UserObject = Object.assign({}, req.auth!);
    const {payload: {sub}, token} = auth0UserObject;
    const subParts: string[] = sub!.split('|');
    const fetchedUser = await UserProfileModel.findOne({accountId: subParts[1]});

    if (fetchedUser) {
      req._user = fetchedUser;
      return next();
    }

    const headers = {
      'authorization': `Bearer ${token}`,
    };

    const userInfoURL = `${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`;

    const {data, error: userInfoError, success} = await APIUtils.performGetRequest(userInfoURL, headers);

    if (!success || userInfoError) {
      // TODO Maybe log this to something like Sentry
      return res.status(500).json({
        message: userInfoError
      });
    }

    const apiUserData = data as Auth0UserData;

    const newUserId = Types.ObjectId.isValid(subParts[1]) ? subParts[1] : new Types.ObjectId().toHexString();

    const userData: Pick<IUserProfile, 
    "_id" | "accountId" | "profilePicture" |"emailAddress" | "providerName" | "firstName" | "lastName"> = {
      _id: newUserId,
      accountId: subParts[1],
      emailAddress: apiUserData.email,
      firstName: apiUserData.nickname,
      lastName: apiUserData.nickname,
      providerName: `${subParts[0]}`,
      profilePicture: apiUserData.picture
    }

    const newUser = await UserProfileModel.create(userData);

    req._user = newUser;

    next();
  } catch (e) {
    return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json({
      message: (e as Error).message
    });
  }
};
