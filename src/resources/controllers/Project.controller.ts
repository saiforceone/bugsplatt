import ProjectModel from "../models/Project.model";
import BaseController from "./Base.controller";

/**
 * @class ProjectController
 * @description Defines a collection of methods specific to working with Project data
 */
export default class ProjectController extends BaseController {
  
  constructor() {
    super(ProjectModel);
  }
}
