import { Model } from "mongoose";
import { pick as lodashPick } from "lodash";
import BaseRouter, {
  POPULATE_ASSIGNED_TO,
  POPULATE_ASSOC_CREATED_BY,
  POPULATE_ASSOC_PROJ,
  POPULATE_ASSOC_TEAM,
  POPULATE_ASSOC_WATCHED_BY,
  ROUTER_RESPONSE_CODES,
  ROUTER_RESPONSE_MESSAGES,
} from "./Base.router";
import ProjectController from "../resources/controllers/Project.controller";
import { Request, RequestHandler, Response } from "express";
import { IProject } from "../resources/interfaces/Project.interface";
import { IIssue } from "../resources/interfaces/Issue.interface";
import Issue from "../resources/models/Issue.model";
import ProjectModel from "../resources/models/Project.model";


const PROJECT_FILTER_FIELDS = ['projectType', 'associatedTeam', 'createdBy'];

/**
 * @class ProjectRouter
 * @extends BaseRouter
 * @description Implements a router specific to projects
 */
export default class ProjectRouter extends BaseRouter {
  private _issueModel: Model<IIssue>;
  private _projectModel: Model<IProject>;

  constructor(basePath: string = "/projects") {
    const projectController = new ProjectController();
    super(basePath, projectController);
    this._issueModel = Issue;
    this._projectModel = ProjectModel;
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
        response.data = await this._controller.getModel().findById(resourceId) as IProject;
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

          const filterObj: {[key: string]: any} = lodashPick(req.query, PROJECT_FILTER_FIELDS);

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
