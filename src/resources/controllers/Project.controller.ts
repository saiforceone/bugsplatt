import { DEFAULT_PAGE_LIMIT } from "../constants";
import { IProject } from "../interfaces/Project.interface";
import ProjectModel from "../models/Project.model";

/**
 * @class ProjectController
 * @description Defines a collection of methods specific to working with Project data
 */
export default class ProjectController {
  
  // CREATE METHOD

  /**
   * @method createProject
   * @param {Partial<IProject>} data Data to be used in creating a project
   * @description Given data as an object, attempts to create a project and returns the result
   * @returns {Promise<any>}
   */
  public async createProject(data: Partial<IProject>) {
    return ProjectModel.create(data);
  }

  // READ METHODS

  /**
   * @method getProjectById
   * @param {string} projectId 
   * @description Given a project id, attempts to find and return the matching Project
   * @returns {Promise<any>}
   */
  public async getProjectById(projectId: string) {
    return ProjectModel.findById(projectId);
  }

  /**
   * @method getProjectByQuery
   * @param {object} queryObject Specifies an object (filter) 
   * @description Given a query object, attempts to return the first matching Project
   * @returns {Promise<any>}
   */
  public async getProjectByQuery(queryObject: object) {
    return ProjectModel.findOne(queryObject);
  }

  /**
   * @method getProjects
   * @param {object} queryObject Specifies an object to be used as a filter
   * @param {number} page Specifies the page of results to return
   * @param {boolean} ignorePagination overrides pagination
   * @description Given a query object (filter), page and ignore pagination option, Attempts to retrieve matching Projects
   * @returns {Promise<any>}
   */
  public async getProjects(queryObject: object, page: number, ignorePagination: boolean) {
    if (ignorePagination) {
      return ProjectModel.find(queryObject);
    }

    return ProjectModel.find(queryObject).skip(page * DEFAULT_PAGE_LIMIT).limit(DEFAULT_PAGE_LIMIT);
  }

  // UPDATE METHOD

  /**
   * @method updateProject
   * @param {string} projectId Specifies the project to be updated
   * @param {Partial<IProject>} data Specifies data to update the project with
   * @returns {Promise<any>}
   */
  public async updateProject(projectId: string, data: Partial<IProject>) {
    return ProjectModel.findByIdAndUpdate(projectId, data);
  }

  // DELETE METHOD

  /**
   * @method deleteProject
   * @param {string} projectId Specifies the project to be deleted
   * @description Given a project id, attempts to delete the matching project and returns the result
   * @returns {Promise<any>}
   */
  public async deleteProject(projectId: string) {
    return ProjectModel.findByIdAndRemove(projectId);
  }
}
