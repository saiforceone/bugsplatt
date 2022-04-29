import UserProfileModel from "../models/UserProfile.model";
import BaseController from "./Base.controller";

/**
 * @class UserProfileController
 * @description Defines a collection of methods specific to User Profiles
 */
export default class UserProfileController extends BaseController {
  constructor() {
    super(UserProfileModel);
  }
}