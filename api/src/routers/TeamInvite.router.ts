import { Model, Types } from "mongoose";
import BaseRouter, {
  ROUTER_RESPONSE_CODES,
  ROUTER_RESPONSE_MESSAGES,
} from "./Base.router";
import TeamInviteController from "../resources/controllers/TeamInvite.controller";
import TeamModel from "../resources/models/Team.model";
import { ITeam } from "../resources/interfaces/Team.interface";
import e, {
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import { ITeamInvite } from "../resources/interfaces/TeamInvite.interface";

export default class TeamInviteRouter extends BaseRouter {
  private _TeamModel: Model<ITeam>;

  constructor(basePath: string) {
    const teamInviteController = new TeamInviteController();
    super(basePath, teamInviteController);
    this._TeamModel = TeamModel;
  }

  protected createResource(
    middleware: Array<e.RequestHandler> = []
  ): e.RequestHandler[] {
    return [
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          const { users } = req.body;
          const usersToInvite = (users as ITeamInvite[]).map((user) => ({
            ...user,
            invitedBy: req._user!._id,
          }));
          const savedInvites = await this._controller.createDocuments(
            usersToInvite
          );
          console.log("TeamInvite.router invite: ", savedInvites);
          response.data = savedInvites;
          response.success = savedInvites.length > 0;
          return res
            .status(
              response.success
                ? ROUTER_RESPONSE_CODES["RESOURCE_CREATED"]
                : ROUTER_RESPONSE_CODES["BAD_REQUEST"]
            )
            .json(response);
        } catch (e) {
          response.error = (e as Error).message;
          return res.status(ROUTER_RESPONSE_CODES["EXCEPTION"]).json(response);
        }
      },
    ];
  }

  // TODO: UPDATE OR REMOVE getResource

  protected getResources(): RequestHandler[] {
    return [
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          const filterObj = {
            invitedUser: req._user!._id,
            inviteStatus: {$ne: 'accepted'}
          };

          response.data = (await this._controller.getDocuments(
            filterObj
          )) as ITeamInvite[];
          response.success = (response.data as ITeamInvite[]).length > 0;

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

  private getInvitesForTeam(): RequestHandler[] {
    return [
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          const teamId: string = req.query.teamId
            ? String(req.query.teamId).trim()
            : "";
          if (!teamId) {
            response.error = ROUTER_RESPONSE_MESSAGES["RES_NOT_FOUND"];
            return res
              .status(ROUTER_RESPONSE_CODES["BAD_REQUEST"])
              .json(response);
          }
          const filterObj = {
            team: teamId,
            inviteStatus: {$ne: 'accepted'}
          };
          const invites = (await this._controller.getDocuments(
            filterObj
          )) as ITeamInvite[];
          response.data = invites;
          response.success = true;
          return res
            .status(
              ROUTER_RESPONSE_CODES["RESOURCE_FOUND"]
            )
            .json(response);
        } catch (e) {
          response.error = (e as Error).message;
          return res.status(ROUTER_RESPONSE_CODES["EXCEPTION"]).json(response);
        }
      },
    ];
  }

  // inviteAction: accept | decline

  private acceptInvite(): RequestHandler[] {
    return [
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          const inviteId: string = req.params.id;
          // check if the invite matches up for the user
          const invite = (await this._controller.getDocumentWithQuery({
            _id: inviteId,
            invitedUser: req._user!._id,
          })) as ITeamInvite;

          if (!invite) {
            response.error = ROUTER_RESPONSE_MESSAGES["RES_NOT_FOUND"];
            return res
              .status(ROUTER_RESPONSE_CODES["BAD_REQUEST"])
              .json(response);
          }

          // Add entry to the team collection
          const updatedTeam = await this._TeamModel.findByIdAndUpdate(
            invite.team,
            {
              $addToSet: { teamMembers: new Types.ObjectId(req._user!._id) },
            }
          );

          if (!updatedTeam) {
            response.error = "Invalid Team";
            return res
              .status(ROUTER_RESPONSE_CODES["BAD_REQUEST"])
              .json(response);
          }

          invite.inviteStatus = "accepted";
          response.data = await invite.save();
          response.success = !!response.data;

          return res
            .status(
              response.success
                ? ROUTER_RESPONSE_CODES["RESOURCE_CREATED"]
                : ROUTER_RESPONSE_CODES["BAD_REQUEST"]
            )
            .json(response);
        } catch (e) {
          response.error = (e as Error).message;
          return res.status(ROUTER_RESPONSE_CODES["EXCEPTION"]).json(response);
        }
      },
    ];
  }

  protected deleteResource(): RequestHandler[] {
    return [
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          const resourceId = req.params.id;
          const filterObj = {
            invitedBy: req._user!._id,
            _id: new Types.ObjectId(resourceId),
          };

          const deleted = await this._controller
            .getModel()
            .findOneAndRemove(filterObj);
          response.data = deleted;
          response.success = true;
          return res
            .status(ROUTER_RESPONSE_CODES["RESOURCE_DELETED"])
            .json(response);
        } catch (e) {
          response.error = (e as Error).message;
          return res.status(ROUTER_RESPONSE_CODES["EXCEPTION"]).json(response);
        }
      },
    ];
  }

  public getRoutes(): Router {
    this._router
      .route(`${this._basePath}/:id/accept-invite`) // TODO: refactor to manage-invite and update method as needed
      .put(this.acceptInvite());
    this._router
      .route(`${this._basePath}/invites-for-team`)
      .get(this.getInvitesForTeam());
    return super.getRoutes();
  }
}
