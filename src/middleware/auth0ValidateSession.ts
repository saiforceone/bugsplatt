import {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import { IUserProfile } from '../resources/interfaces/UserProfile.interface';
import UserProfileModel from '../resources/models/UserProfile.model';
import { ROUTER_RESPONSE_CODES } from '../routers/Base.router';

export const auth0ValidateSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. retrieve the token (bearer)
    const auth0UserObject = Object.assign({}, req.user!);
    // 2. get the user id
    const {sub, emailAddress, nickname, picture} = auth0UserObject;
    console.log('auth0ValidateSession.middleware sub: ', sub);
    // 3. lookup user in db 
    const subParts: string[] = sub.split('|');
    // 4. set req._user
    const fetchedUser = await UserProfileModel.findOne({accountId: subParts[1]});

    // 5. forward to next handler in chain
    if (fetchedUser) {
      req._user = fetchedUser;
      return next();
    }

    const newUserId = Types.ObjectId.isValid(subParts[1]) ? subParts[1] : new Types.ObjectId().toHexString();

    // 6. create user
    const userData: Pick<IUserProfile, 
    "_id" | "accountId" | "profilePicture" |"emailAddress" | "providerName" | "firstName" | "lastName"> = {
      _id: newUserId,
      accountId: subParts[1],
      emailAddress,
      firstName: nickname,
      lastName: nickname,
      providerName: `${subParts[0]}`,
      profilePicture: picture
    }

    const newUser = await UserProfileModel.create(userData);

    // set the user on the request object
    req._user = newUser;

    next();
  } catch (e) {
    return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json({
      message: (e as Error).message
    });
  }
};
