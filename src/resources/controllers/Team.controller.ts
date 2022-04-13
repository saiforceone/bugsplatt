import { DEFAULT_PAGE_LIMIT } from "../constants";
import { ITeam } from "../interfaces/Team.interface";
import TeamModel from "../models/Team.model";

/**
 * @class TeamController
 * @description Defines methods specific to working with the Team model
 */
export default class TeamController {
  // CREATE METHOD
  /**
   * @async
   * @method createTeam
   * @param {Partial<ITeam>} data Data to be used in creating the team
   * @description Given some data, attempts to create a team and returns the result
   * @returns {Promise<any>}
   */
  public async createTeam(data: Partial<ITeam>) {
    return TeamModel.create(data);
  }

  // READ METHODS
  /**
   * @method getTeamById 
   * @param {string} teamId Specifies the id for the team to be retrieved
   * @description Given a team id, attempts to retrieve the matching team
   * @returns {Promise<any>}
   */
  public async getTeamById(teamId: string) {
    return TeamModel.findById(teamId);
  }

  /**
   * @method getTeamByQuery
   * @param {object} queryObject Specifies an object to be used as a filter
   * @description Given a query object (filter), attempts to find and return the first matching Team
   * @returns {Promise<any>}
   */
  public async getTeamByQuery(queryObject: object) {
    return TeamModel.findOne(queryObject);
  }

  /**
   * @method getTeams
   * @param {object} queryObject Specifies an object to be used as a filter
   * @param {number} page Specifies the page of results to return
   * @param {boolean} ignorePagination Overrides pagination
   * @description Given a query object (filter), page and ignore pagination option, returns matching teams
   * @returns {Promise<any>}
   */
  public async getTeams(queryObject: object, page: number, ignorePagination: boolean) {
    if (ignorePagination) {
      return TeamModel.find(queryObject);
    }

    return TeamModel.find(queryObject).skip(page * DEFAULT_PAGE_LIMIT).limit(DEFAULT_PAGE_LIMIT);
  }

  // UPDATE METHOD

  /**
   * @method updateTeam
   * @param {string} teamId Specifies the team to be updated
   * @param {Partial<ITeam>} data Contains the update data for the team
   * @description Given a team id and data, attempts to update the matching Team and returns the result
   * @returns {Promise<any>}
   */
  public async updateTeam(teamId: string, data: Partial<ITeam>) {
    return TeamModel.findByIdAndUpdate(teamId, data);
  }

  // DELETE METHOD

  /**
   * @method deleteTeam
   * @param {string} teamId Specifies the team to be removed
   * @description Given a team id, attempts to remove the matching team and returns the result
   * @returns {Promise<any>}
   */
  public async deleteTeam(teamId: string) {
    return TeamModel.findByIdAndDelete();
  }
}