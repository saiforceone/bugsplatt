import {Model, Types} from 'mongoose';
import BaseRouter, { ROUTER_RESPONSE_CODES, ROUTER_RESPONSE_MESSAGES } from './Base.router';
import ProjectController from '../resources/controllers/Project.controller';
import { Request, RequestHandler, Response } from 'express';
import { IProject } from '../resources/interfaces/Project.interface';
import { IIssue } from '../resources/interfaces/Issue.interface';
import Issue  from '../resources/models/Issue.model';


/**
 * @class ProjectRouter
 * @extends BaseRouter
 * @description Implements a router specific to projects
 */
export default class ProjectRouter extends BaseRouter {
  private _issueModel: Model<IIssue>

  constructor(basePath: string = '/projects') {
    const projectController = new ProjectController();
    super(basePath, projectController);
    this._issueModel = Issue;
  }

  protected createResource(middleware: RequestHandler[] = []): RequestHandler[] {
    return [...middleware, async (req: Request, res: Response) => {
      const response = this.getDefaultResponse();
      try {
        const data = req.body;

        data.createdBy = req._user!._id;
        data.associatedTeam = new Types.ObjectId();
        
        response.data = await this._controller.createDocument(data) as IProject;
        response.success = !!response.data;

        return res.status(ROUTER_RESPONSE_CODES.RESOURCE_CREATED).json(response);
      } catch (e) {
        response.error = (e as Error).message;
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response)
      }
    }];
  }

  protected deleteResource(middleware: RequestHandler[] = []): RequestHandler[] {
    return [...middleware, async (req: Request, res: Response) => {
      
      const response = this.getDefaultResponse();
      
      try {

        const resourceId: string = req.params.id;

        const resourceToDelete = await this._controller.getDocumentWithQuery({
          _id: resourceId,
          createdBy: req._user!._id,
        }) as IProject;

        if (!resourceToDelete) {
          response.error = `${ROUTER_RESPONSE_MESSAGES.RES_NOT_FOUND} :: Project`;
          return res.status(ROUTER_RESPONSE_CODES.RESOURCE_NOT_FOUND).json(response);
        }

        const delRelatedIssuesResult = await this._issueModel.deleteMany({
          associatedProject: resourceToDelete._id
        });

        console.log(`${this.constructor.name}.deleteResource deletedRelatedIssues: `, delRelatedIssuesResult);

        // Delete the actual resource
        const resDeleteResponse = await resourceToDelete.remove();
        console.log(`${this.constructor.name}.deleteResource resDeleteResponse: `, resDeleteResponse);

        response.success = !!resDeleteResponse;
        return res.status(ROUTER_RESPONSE_CODES.RESOURCE_DELETED).json(response);
      } catch (e) {
        response.error = (e as Error).message;
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
      }
    }];
  }
}
