import { Request, RequestHandler, Response, Router } from "express";
import { Model } from "mongoose";
import BaseRouter, {
  ROUTER_RESPONSE_CODES,
  ROUTER_RESPONSE_MESSAGES,
} from "./Base.router";
import TeamController from "../resources/controllers/Team.controller";
import { ITeam } from "../resources/interfaces/Team.interface";
import IssueModel from "../resources/models/Issue.model";
import { IIssue } from "../resources/interfaces/Issue.interface";
import ProjectModel from "../resources/models/Project.model";
import { IProject } from "../resources/interfaces/Project.interface";
import { IUserProfile } from "../resources/interfaces/UserProfile.interface";
import UserProfileModel from "../resources/models/UserProfile.model";

/**
 * @class TeamRouter
 * @extends BaseRouter
 * @description Defines an interface specific to Teams
 */
export default class TeamRouter extends BaseRouter {
  private _issueModel: Model<IIssue>;
  private _projectModel: Model<IProject>;
  private _userProfileModel: Model<IUserProfile>;

  constructor(basePath: string = "/teams") {
    const teamController = new TeamController();
    super(basePath, teamController);
    this._issueModel = IssueModel;
    this._projectModel = ProjectModel;
    this._userProfileModel = UserProfileModel;
  }

  // TODO: REMOVE LATER
  protected createResource(
    middleware: RequestHandler[] = []
  ): RequestHandler[] {
    return [
      ...middleware,
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();

        try {
          const body = req.body;

          body.managedBy = req._user!._id;

          response.data = (await this._controller.createDocument(
            body
          )) as ITeam;
          response.success = !!response.data;
          return res
            .status(ROUTER_RESPONSE_CODES.RESOURCE_CREATED)
            .json(response);
        } catch (e) {
          response.error = (e as Error).message;
          return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
        }
      },
    ];
  }

  private getAvailableUsers(): RequestHandler[] {
    return [
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          const teamId: string = req.params.id;

          const team = (await this._controller.getDocumentById(
            teamId
          )) as ITeam;

          if (!team) {
            response.error = ROUTER_RESPONSE_MESSAGES["RES_NOT_FOUND"];
            return res
              .status(ROUTER_RESPONSE_CODES["BAD_REQUEST"])
              .json(response);
          }

          const filterObj = {
            _id: { $nin: [req._user!._id, ...team.teamMembers] },
          };

          response.data = await this._userProfileModel.find(filterObj);
          response.success = (response.data as IUserProfile[]).length > 0;

          return res
            .status(
              response.success
                ? ROUTER_RESPONSE_CODES["RESOURCE_FOUND"]
                : ROUTER_RESPONSE_CODES["RESOURCE_NOT_FOUND"]
            )
            .json(response);
        } catch (e) {
          response.error = (e as Error).message;
          return res.status(ROUTER_RESPONSE_CODES["EXCEPTION"]).json(response);
        }
      },
    ];
  }

  protected deleteResource(
    middleware: RequestHandler[] = []
  ): RequestHandler[] {
    return [
      ...middleware,
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();

        try {
          const resourceId: string = req.params.id;

          const teamResource = (await this._controller.getDocumentWithQuery({
            _id: resourceId,
            managedBy: req._user!._id,
          })) as ITeam;

          if (!teamResource) {
            response.error = ROUTER_RESPONSE_MESSAGES.RES_NOT_FOUND;
            return res
              .status(ROUTER_RESPONSE_CODES.RES_NOT_FOUND)
              .json(response);
          }

          // NOTE start: Current implementation may not work as expected as we don't have properly linked resources

          // retrieve the related projects
          const relatedProjects = (await this._projectModel.find({
            associatedTeam: teamResource._id,
          })) as IProject[];

          // retrieve the related issues and delete them too
          for (const proj of relatedProjects) {
            // fire and forget delete issue calls
            const issueDeleteResult = await this._issueModel.deleteMany({
              associatedProject: proj._id,
            });
            console.log(
              `${this.getName()} deleteRelatedIssue result: `,
              issueDeleteResult
            );
            await proj.remove();
          }
          // NOTE END

          const resDeleteResponse = await teamResource.delete();

          response.success = !!resDeleteResponse;
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
    this._router
      .route(`${this._basePath}/:id/available-users`)
      .get(this.getAvailableUsers());
    return super.getRoutes();
  }
}
