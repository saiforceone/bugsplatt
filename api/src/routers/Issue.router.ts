import { Request, RequestHandler, Response } from "express";
import {pick as lodashPick} from "lodash";
import {Model} from "mongoose";
import BaseRouter, { ROUTER_RESPONSE_CODES } from "./Base.router";
import IssueController from "../resources/controllers/Issue.controller";
import { IIssue } from "../resources/interfaces/Issue.interface";
import CommentModel from "../resources/models/Comment.model";
import { IComment } from "../resources/interfaces/Comment.interface";

const ISSUE_FILTER_FIELDS = ['createdBy', 'associatedProject', 'status', 'priority'];

/**
 * @class IssueRouter
 * @extends BaseRouter
 * @description Implements a router specific to issues
 */
export default class IssueRouter extends BaseRouter {
  
  private _commentModel: Model<IComment>;

  constructor(basePath = "/comments") {
    const issueController = new IssueController();
    super(basePath, issueController);
    this._commentModel = CommentModel;
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
          if (!data.assignedTo) data.assignedTo = req._user!._id;
          if (!data.status) data.status = 'active';
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
      try {
        const filterObj: {[key: string]: any} = lodashPick(req.query, ISSUE_FILTER_FIELDS);
        const data = await this._controller.getModel().find(filterObj) as IIssue[];

        response.data = data;
        response.success = data.length > 0;
        return res.status(ROUTER_RESPONSE_CODES.RESOURCE_FOUND).json(response);

      } catch (e) {
        response.error = (e as Error).message;
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
      }
    }];
  }

  protected deleteResource(middleware: RequestHandler[] = []): RequestHandler[] {
    return [...middleware, async (req: Request, res: Response) => {
      const response = this.getDefaultResponse();
      try {
        const resourceId: string = req.params.id;

        const issueToDelete = (await this._controller.getDocumentWithQuery({
          createdBy: req._user!._id,
          _id: resourceId
        })) as IIssue;


        if (!issueToDelete) {
          response.error = "Resource not found"
          return res.status(ROUTER_RESPONSE_CODES.RESOURCE_NOT_FOUND).json(response)
        }

        // Delete associated comments
        const deleteCommentsResult = await this._commentModel.deleteMany({
          associatedIssue: issueToDelete._id
        });

        console.log(`Delete related comments for issue: ${issueToDelete.title} and reuslt: ${deleteCommentsResult}`);

        const deleteIssueResult = await issueToDelete.remove();

        response.success = !!deleteIssueResult
          return res
            .status(ROUTER_RESPONSE_CODES.RESOURCE_DELETED)
            .json(response);

      } catch (e) {
        response.error = (e as Error).message;
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
      }
    }];
  }
}
