import { Model } from "mongoose";
import { pick as lodashPick } from "lodash";
import BaseRouter, {
  ROUTER_RESPONSE_CODES,
  ROUTER_RESPONSE_MESSAGES,
} from "./Base.router";
import ProjectController from "../resources/controllers/Project.controller";
import { Request, RequestHandler, Response } from "express";
import { IProject } from "../resources/interfaces/Project.interface";
import { IIssue } from "../resources/interfaces/Issue.interface";
import Issue from "../resources/models/Issue.model";
import ProjectModel from "../resources/models/Project.model";
import TeamModel from "../resources/models/Team.model";
import { ITeam } from "../resources/interfaces/Team.interface";


const PROJECT_FILTER_FIELDS = ['projectType', 'associatedTeam', 'createdBy'];

/**
 * @class ProjectRouter
 * @extends BaseRouter
 * @description Implements a router specific to projects
 */
export default class ProjectRouter extends BaseRouter {
  private _issueModel: Model<IIssue>;
  private _projectModel: Model<IProject>;
  private _teamModel: Model<ITeam>;

  constructor(basePath: string = "/projects") {
    const projectController = new ProjectController();
    super(basePath, projectController);
    this._issueModel = Issue;
    this._projectModel = ProjectModel;
    this._teamModel = TeamModel;
  }

  private async getIssuesForProject(projectId: string): Promise<IIssue[]> {
    try {
      return await this._issueModel
        .find({ associatedProject: projectId })
        .select("-__v");

    } catch (e) {
      return [];
    }
  }

  protected createResource(
    middleware: RequestHandler[] = []
  ): RequestHandler[] {
    return [
      ...middleware,
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          const data = req.body;

          data.createdBy = req._user!._id;

          response.data = (await this._controller.createDocument(
            data
          )) as IProject;
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

  protected getResource(middleware: RequestHandler[] = []): RequestHandler[] {
    return [...middleware, async (req: Request, res: Response) => {
      const response = this.getDefaultResponse();
      try {
        const resourceId = req.params.id;
        const project = await this._controller.getModel().findById(resourceId);
        const issues = await this.getIssuesForProject(project._id);
        response.data = {...project.toJSON(), issues};
        response.success = !!response.data;
        return res.status(
          response.success ? ROUTER_RESPONSE_CODES.RESOURCE_FOUND : ROUTER_RESPONSE_CODES.RESOURCE_NOT_FOUND
        ).json(response);
      } catch (e) {
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
      }
    }]
  }

  protected getResources(middleware: RequestHandler[] = []): RequestHandler[] {
    return [
      ...middleware,
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          // const limit = req.query.limit ? req.query.limit : '';

          const startDate = req.query.startDate ? String(req.query.startDate).trim() : undefined;
          const endDate = req.query.endDate ? String(req.query.endDate).trim() : undefined;

          const filterObj: {[key: string]: any} = lodashPick(req.query, PROJECT_FILTER_FIELDS);
          
          // Filter for current user
          const userTeams = await this._teamModel.find({
            $or: [{teamMembers: {$in: [req._user!._id]}}, {managedBy: req._user!._id}]
          });
          console.log('userTeams: ', userTeams);
          filterObj['associatedTeam'] = {$in: userTeams};

          const dateFilter: {[key: string]: any} = {}
          if (startDate) dateFilter['$gt'] = new Date(startDate);
          if (endDate) dateFilter['$lte'] = new Date(endDate);

          if (Object.keys(dateFilter).length) filterObj['createdAt'] = dateFilter;

          const data = await this._projectModel
            .find(filterObj)
            .select("-__v");

          const _data = [];
          // fetch issues for each project
          for (const proj of data) {
            const issues = await this.getIssuesForProject(proj._id);
            _data.push({ ...proj.toJSON(), issues });
          }

          response.data = _data;
          response.success = _data.length > 0;

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

  protected deleteResource(
    middleware: RequestHandler[] = []
  ): RequestHandler[] {
    return [
      ...middleware,
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();

        try {
          const resourceId: string = req.params.id;

          const resourceToDelete = (await this._controller.getDocumentWithQuery(
            {
              _id: resourceId,
              createdBy: req._user!._id,
            }
          )) as IProject;

          if (!resourceToDelete) {
            response.error = `${ROUTER_RESPONSE_MESSAGES.RES_NOT_FOUND} :: Project`;
            return res
              .status(ROUTER_RESPONSE_CODES.RESOURCE_NOT_FOUND)
              .json(response);
          }

          const delRelatedIssuesResult = await this._issueModel.deleteMany({
            associatedProject: resourceToDelete._id,
          });

          console.log(
            `${this.constructor.name}.deleteResource deletedRelatedIssues: `,
            delRelatedIssuesResult
          );

          // Delete the actual resource
          const resDeleteResponse = await resourceToDelete.remove();
          console.log(
            `${this.constructor.name}.deleteResource resDeleteResponse: `,
            resDeleteResponse
          );

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
}
