import { DEFAULT_PAGE_LIMIT } from "../constants";
import { IIssue } from "../interfaces/Issue.interface";
import IssueModel from "../models/Issue.model";

/**
 * @class IssueController
 * @description Defines an issue controller. A collection of methods specific to working with Issues
 */
export default class IssueController {
  
  /**
   * @public
   * @method createIssue
   * @param {object} data 
   * @description Creates an issue given data
   * @returns {Promise<any>}
   */
  public async createIssue(data: Partial<IIssue>) {
    return IssueModel.create(data);
  }

  /**
   * @public
   * @method findIssueById
   * @param {string} issueId The id of the issue to be retrieved
   * @description Fetches an issue given an id
   * @returns {Promise<any>}
   */
  public async findIssueById(issueId: string) {
    return IssueModel.findById(issueId);
  }

  /**
   * @public
   * @method findIssueWithQuery
   * @param {object} queryObject The object used to search for the single issue
   * @description Fetches an issue given a query object
   * @returns {Promise<any>}
   */
  public async findIssueWithQuery(queryObject: object) {
    return IssueModel.findOne(queryObject);
  }

  /**
   * @public
   * @method findIssues
   * @param {object} queryObject The object used to search for issues
   * @param {number} page Page of results to return
   * @param {boolean} ignorePagination Specifies if pagination should be ignored
   * @description Fetches issues given a query object
   * @returns {Promise<any>}
   */
  public async findIssues(queryObject: object, page: number, ignorePagination: boolean) {
    if (ignorePagination) {
      return IssueModel.find(queryObject);
    }

    return IssueModel.find(queryObject).skip(page * DEFAULT_PAGE_LIMIT).limit(DEFAULT_PAGE_LIMIT);
  }

  /**
   * @public
   * @method updateIssue
   * @param {string} issueId Specifies the issue to updated
   * @param {Partial<IIssue>} data The data that should be used to update the issue
   * @returns {Promise<any>}
   */
  public async updateIssue(issueId: string, data: Partial<IIssue>) {
    return IssueModel.findByIdAndUpdate(issueId, data);
  }

  /**
   * @public
   * @method deleteIssue
   * @param {string} issueId Specifies the issue to be deleted
   * @description Removes the issue but not the related data like comments
   * @returns {Promise<any>}
   */
  public async deleteIssue(issueId: string) {
    return IssueModel.findByIdAndDelete(issueId);
  }
}
