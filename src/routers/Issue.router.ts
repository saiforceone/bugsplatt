import {Types} from 'mongoose';
import { Request, RequestHandler, Response } from "express";
import BaseRouter, { ROUTER_RESPONSE_CODES } from "./Base.router";
import IssueController from "../resources/controllers/Issue.controller";

/**
 * @class IssueRouter
 * @extends BaseRouter
 * @description Implements a router specific to issues
 */
export default class IssueRouter extends BaseRouter {
  constructor(basePath = '/comments') {
    const issueController = new IssueController();
    super(basePath, issueController);
  }

  protected createResource(middleware: RequestHandler[] = []): RequestHandler[] {
    return [...middleware, async (req: Request, res: Response) => {
      const response = this.getDefaultResponse();
      try {
        const data = req.body;
        // Note start: Until middleware is configured, we will substitute random object ids
        data.createdBy = req._user!._id;
        // data.associatedIssue = new Types.ObjectId();
        // data.assignedTo = new Types.ObjectId();
        // data.watchedBy = [new Types.ObjectId()];
        // Note end
        response.data = await this._controller.createDocument(data) as object;
        response.success = !!response.data;
        return res.status(
          response.success
            ? ROUTER_RESPONSE_CODES.RESOURCE_CREATED
            : ROUTER_RESPONSE_CODES.BAD_REQUEST
        ).json(response);
      } catch (e) {
        response.error = (e as Error).message;
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
      }
    }];
  }
}