import { NextFunction, Request, Response } from "express";

import {Types} from 'mongoose';
import { IUserProfile } from "../resources/interfaces/UserProfile.interface";
import UserProfileModel from "../resources/models/UserProfile.model";

import { ROUTER_RESPONSE_CODES } from "../routers/Base.router";

export const requireAuthAPI = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(ROUTER_RESPONSE_CODES.UNAUTHORIZED).json({message: 'unauthorized'})
  }

  try {
    const user = req.oidc.user;

    // check if the user exists
    if (!user) {
      return res.status(ROUTER_RESPONSE_CODES.UNAUTHORIZED);
    }

    console.log('authMiddleware user object: ', user);

    const dbUser = await UserProfileModel.findOne({
      emailAddress: user.email
    });

    if (dbUser) {
      req._user = dbUser;
      return next();
    }

    const uidParts: String[] = String(user.sub).split('|');

    const accountId = Types.ObjectId.isValid(`${uidParts[1]}`) ? `${uidParts[1]}` :  new Types.ObjectId().toHexString();

    const userData: Pick<IUserProfile, 
    "_id" | "accountId" | "profilePicture" |"emailAddress" | "providerName" | "firstName" | "lastName"> = {
      _id: accountId,
      accountId,
      emailAddress: user.email,
      providerName: `${uidParts[0]}`,
      firstName: user.nickname,
      lastName: user.nickname,
      profilePicture: user.picture,
    };

    const createdUser = await UserProfileModel.create(userData);

    if (!createdUser) {
      return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json({
        message: 'failed to create user',
      });
    }

    req._user = createdUser;
    next();
  } catch (e) {
    return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json({
      message: (e as Error).message
    });
  }

  next();
};
