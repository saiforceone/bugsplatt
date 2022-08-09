import { Request, RequestHandler, Response } from "express";
import {pick as lodashPick} from "lodash";
import BaseRouter, { POPULATE_ASSOC_PROJ, POPULATE_ASSOC_WATCHED_BY, ROUTER_RESPONSE_CODES } from "./Base.router";
import IssueController from "../resources/controllers/Issue.controller";
import { IIssue } from "../resources/interfaces/Issue.interface";

const ISSUE_FILTER_FIELDS = ['createdBy', 'associatedProject', 'status', 'issuePriority'];

/**
 * @class IssueRouter
 * @extends BaseRouter
 * @description Implements a router specific to issues
 */
export default class IssueRouter extends BaseRouter {
  constructor(basePath = "/comments") {
    const issueController = new IssueController();
    super(basePath, issueController);
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
          // Note start: Until middleware is configured, we will substitute random object ids
          data.createdBy = req._user!._id;
          // data.associatedIssue = new Types.ObjectId();
          // data.assignedTo = new Types.ObjectId();
          // data.watchedBy = [new Types.ObjectId()];
          // Note end
          response.data = (await this._controller.createDocument(
            data
          )) as object;
          response.success = !!response.data;
          return res
            .status(
              response.success
                ? ROUTER_RESPONSE_CODES.RESOURCE_CREATED
                : ROUTER_RESPONSE_CODES.BAD_REQUEST
            )
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
        const resourceId: string = req.params.id;

        response.data = await this._controller.getModel().findById(resourceId) as IIssue;
        response.success = !!response.data;

        return res.status(response.data ? ROUTER_RESPONSE_CODES.RESOURCE_FOUND : ROUTER_RESPONSE_CODES.RESOURCE_NOT_FOUND).json(response)
      } catch (e) {
        response.error = (e as Error).message;
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
      }
    }];
  }

  protected getResources(middleware: RequestHandler[] = []): RequestHandler[] {
    return [...middleware, async (req: Request, res: Response) => {
      const response = this.getDefaultResponse();
      const filterObj: {[key: string]: any} = lodashPick(req.query, ISSUE_FILTER_FIELDS);
      try {
        // TODO: add query string processing
        const data = await this._controller.getModel().find(filterObj)
        .populate(POPULATE_ASSOC_PROJ).populate(POPULATE_ASSOC_WATCHED_BY) as IIssue[];

        response.data = data;
        response.success = data.length > 0;
        return res.status(ROUTER_RESPONSE_CODES.RESOURCE_FOUND).json(response);

      } catch (e) {
        response.error = (e as Error).message;
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
      }
    }];
  }
}
