import {Model} from 'mongoose';
import BaseRouter, { ROUTER_RESPONSE_CODES } from "./Base.router";
import UserProfileController from "../resources/controllers/UserProfile.controller";
import { Request, RequestHandler, Response } from "express";
import TeamModel from '../resources/models/Team.model';
import { ITeam } from '../resources/interfaces/Team.interface';
import IssueModel from '../resources/models/Issue.model';
import { IIssue } from '../resources/interfaces/Issue.interface';
import ProjectModel from '../resources/models/Project.model';
import { IProject } from '../resources/interfaces/Project.interface';
import { IUserProfile } from '../resources/interfaces/UserProfile.interface';


export default class UserProfileRouter extends BaseRouter {
  private _issueModel: Model<IIssue>;
  private _projectModel: Model<IProject>;
  private _teamModel: Model<ITeam>;

  constructor(basePath: string = '/users') {
    const userProfileController = new UserProfileController();
    super(basePath, userProfileController);
    this._issueModel = IssueModel;
    this._projectModel = ProjectModel;
    this._teamModel = TeamModel;
  }

  // #TODO complete implementation
  // private async _removeRelatedUserData(currentUser: IUserProfile): Promise<string[]> {
  //   return [];
  // }

  // protected deleteResource(middleware: RequestHandler[] = []): RequestHandler[] {
  //   return [...middleware, async (req: Request, res: Response) => {
  //     const response = this.getDefaultResponse();
  //     try {
  //       // NOTE START: we will need the middleware to retrieve the user 
  //       // #TODO: COMPLETE IMPLEMENTATION BELOW
  //       // 1. get current user
  //       // const currentUser = await this._controller.getDocumentById(req.user._id) as IUserProfile;
  //       // 2. find and remove all teams
  //       // const delRelatedErrors = await this._removeRelatedUserData(currentUser);
  //       // 3. for each team, find related projects
  //       // 4. for each project, find and remove all issues

  //       // NOTE END
  //     } catch (e) {
  //       response.error = (e as Error).message;
  //       return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
  //     }
  //   }];
  // }
}
