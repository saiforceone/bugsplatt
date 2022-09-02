import { Model } from "mongoose";
import BaseRouter, { ROUTER_RESPONSE_CODES } from "./Base.router";
import UserProfileController from "../resources/controllers/UserProfile.controller";
import { Request, RequestHandler, Response, Router } from "express";
import TeamModel from "../resources/models/Team.model";
import { ITeam } from "../resources/interfaces/Team.interface";
import IssueModel from "../resources/models/Issue.model";
import { IIssue } from "../resources/interfaces/Issue.interface";
import ProjectModel from "../resources/models/Project.model";
import { IProject } from "../resources/interfaces/Project.interface";
import { IUserProfile } from "../resources/interfaces/UserProfile.interface";

export default class UserProfileRouter extends BaseRouter {
  private _issueModel: Model<IIssue>;
  private _projectModel: Model<IProject>;
  private _teamModel: Model<ITeam>;

  constructor(basePath: string = "/users") {
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
          console.log(
            `${this.constructor.name}._removeRelatedUserData: `,
            delIssuesResult
          );
          const delProjResult = await project.delete();
          console.log(
            `${this.constructor.name}._removeRelatedUserData: `,
            delProjResult
          );
        }

        const teamDelResult = await team.delete();
        console.log(
          `${this.constructor.name}._removeRelationUserData: `,
          teamDelResult
        );
      }
    } catch (e) {
      errors.push((e as Error).message);
    }

    return errors;
  }

  // READ / GET
  public getCurrentUser(): RequestHandler[] {
    return [
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          const user = (await this._controller.getDocumentById(
            req._user!._id
          )) as IUserProfile;

          if (!user) {
            response.error = "User not found";
            return res.status(ROUTER_RESPONSE_CODES.BAD_REQUEST).json(response);
          }

          response.data = user;
          response.success = !!user;

          return res
            .status(ROUTER_RESPONSE_CODES.RESOURCE_FOUND)
            .json(response);
        } catch (e) {
          response.error = (e as Error).message;
          return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
        }
      },
    ];
  }

  /** @deprecated */
  private getAvailableUsers(): RequestHandler[] {
    return [
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          const filterObj = {
            _id: { $ne: req._user!._id },
          };
          const availableUsers = (await this._controller.getDocuments(
            filterObj
          )) as IUserProfile[];
          response.data = availableUsers;
          response.success = availableUsers.length > 0;
          return res
            .status(
              !response.success
                ? ROUTER_RESPONSE_CODES.RESOURCE_NOT_FOUND
                : ROUTER_RESPONSE_CODES.RESOURCE_FOUND
            )
            .json(response);
        } catch (e) {
          response.error = (e as Error).message;
          return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
        }
      },
    ];
  }

  // DELETE

  protected deleteResource(
    middleware: RequestHandler[] = []
  ): RequestHandler[] {
    return [
      ...middleware,
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          if (!req._user) {
            response.error = "User not found";
            return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
          }

          const delRelatedErrors = await this._removeRelatedUserData(
            req._user._id
          );

          console.log("delete user profile errors: ", delRelatedErrors);

          if (this.deleteResource.length) {
            response.error = delRelatedErrors.join(", ");
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

  public getRoutes(): Router {
    this._router.route(`${this._basePath}`).get(this.getCurrentUser());
    this._router.route(`${this._basePath}/available-users`).get(this.getAvailableUsers());
    this._router.route(`${this._basePath}/:id`).delete(this.deleteResource());
    return this._router;
  }
}
