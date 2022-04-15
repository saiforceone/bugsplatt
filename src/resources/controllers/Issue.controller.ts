import IssueModel from "../models/Issue.model";
import BaseController from "./Base.controller";

/**
 * @class IssueController
 * @description Defines an issue controller. A collection of methods specific to working with Issues
 */
export default class IssueController extends BaseController {
  
  constructor() {
    super(IssueModel);
  }
}
