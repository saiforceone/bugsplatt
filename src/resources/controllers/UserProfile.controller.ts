import { IUserProfile } from "../interfaces/UserProfile.interface";
import UserProfileModel from "../models/UserProfile.model";
import { DEFAULT_PAGE_LIMIT } from "../constants";

/**
 * @class UserProfileController
 * @description Defines a collection of methods specific to User Profiles
 */
export default class UserProfileController {
  // CREATE

  /**
   * @method createUserProfile
   * @param {Partial<IUserProfile>} data Specifies data to be used in creating a user profile
   * @description given data, attempts to create a user profile and returns the result
   * @returns {Promise<any>}
   */
  public async createUserProfile(data: Partial<IUserProfile>) {
    return UserProfileModel.create(data);
  }

  // READ

  /**
   * @method getProfileById
   * @param {string} userId Specifies the user id to search for
   * @description Given a user id, attempts to find and return the matching profile
   * @returns {Promise<any>}
   */
  public async getProfileById(userId: string) {
    return UserProfileModel.findById(userId);
  }

  /**
   * @method getProfileByQuery
   * @param {object} queryObject Specifies the object to be used as a filter
   * @description given a query object(filter), attempts to find and return the first matching profile
   * @returns {Promise<any>}
   */
  public async getProfileByQuery(queryObject: object) {
    return UserProfileModel.findOne(queryObject);
  }

  /**
   * @method getProfiles
   * @param {object} queryObject Specifies the object to be used a filter
   * @param {number} page Specifies the page of results to be returned
   * @param {boolean} ignorePagination Overrides pagination
   * @returns {Promise<any>}
   */
  public async getProfiles(queryObject: object, page: number, ignorePagination: boolean) {
    if (ignorePagination) {
      return UserProfileModel.find(queryObject);
    }

    return UserProfileModel.find(queryObject).skip(page * DEFAULT_PAGE_LIMIT).limit(DEFAULT_PAGE_LIMIT);
  }

  // UPDATE

  /**
   * @method updateUserProfile
   * @param {string} userId Specifies the user profile to be updated
   * @param {Partial<IUserProfile>} data Specifies the data the user profile is to be updated with
   * @description Given a user id and data, attempts to update the matching user profile and returns the result
   * @returns {Promise<any>}
   */
  public async updateUserProfile(userId: string, data: Partial<IUserProfile>) {
    return UserProfileModel.findByIdAndUpdate(userId, data);
  }

  // DELETE

  /**
   * @method deleteUserProfile
   * @param {string} userId Specifies the user profile to be deleted
   * @description Given a user id, attempts to delete the user profile and returns the result
   * @returns {Promise<any>}
   */
  public async deleteUserProfile(userId: string) {
    return UserProfileModel.findByIdAndRemove(userId);
  }
}