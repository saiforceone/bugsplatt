import { Model } from 'mongoose';
import BaseRouter, { ROUTER_RESPONSE_CODES } from './Base.router';
import UserProfileController from '../resources/controllers/UserProfile.controller';
import { Request, RequestHandler, Response } from 'express';
import TeamModel from '../resources/models/Team.model';
import { ITeam } from '../resources/interfaces/Team.interface';
import IssueModel from '../resources/models/Issue.model';
import { IIssue } from '../resources/interfaces/Issue.interface';
import ProjectModel from '../resources/models/Project.model';
import { IProject } from '../resources/interfaces/Project.interface';
import { IUserProfile } from '../resources/interfaces/UserProfile.interface';
import logger from '../utils/logger.util';

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

  private async _removeRelatedUserData(
    currentUserId: string
  ): Promise<string[]> {
    const errors = [];
    // 1. find the related projects
    try {
      const relatedTeams = await this._teamModel.find({
        managedBy: currentUserId,
      });

      for (const team of relatedTeams) {
        const relatedProjects = await this._projectModel.find({
          createdBy: currentUserId,
          associatedTeam: team._id,
        });

        // delete the issues for each project
        for (const project of relatedProjects) {
          const delIssuesResult = await this._issueModel.deleteMany({
            associatedProject: project._id,
          });
          logger.info(
            `${this.constructor.name}._removeRelatedUserData: `,
            delIssuesResult
          );
          const delProjResult = await project.delete();
          logger.info(
            `${this.constructor.name}._removeRelatedUserData: `,
            delProjResult
          );
        }

        const teamDelResult = await team.delete();
        logger.info(
          `${this.constructor.name}._removeRelationUserData: `,
          teamDelResult
        );
      }
    } catch (e) {
      errors.push((e as Error).message);
    }

    return errors;
  }

  protected deleteResource(
    middleware: RequestHandler[] = []
  ): RequestHandler[] {
    return [
      ...middleware,
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          if (!req._user) {
            response.error = 'User not found';
            return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
          }

          const delRelatedErrors = await this._removeRelatedUserData(
            req._user._id
          );

          logger.info('delete user profile errors: ', delRelatedErrors);

          if (this.deleteResource.length) {
            response.error = delRelatedErrors.join(', ');
            return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
          }

          response.success = true;
          return res
            .status(ROUTER_RESPONSE_CODES.RESOURCE_DELETED)
            .json(response);
        } catch (e) {
          response.error = (e as Error).message;
          return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
        }
      },
    ];
  }
}
