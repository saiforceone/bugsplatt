import { Types } from "mongoose";

import BaseRouter, {
  POPULATE_ASSOC_CREATED_BY,
  POPULATE_ASSOC_ISSUE,
  ROUTER_RESPONSE_CODES,
} from "./Base.router";
import CommentController from "../resources/controllers/Comment.controller";
import { Request, Response, RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IComment } from "../resources/interfaces/Comment.interface";

// TODO: Add autopopulate to model schema

/**
 * @class CommentRouter
 * @extends BaseRouter
 * @description Router specific to comments
 */
export default class CommentRouter extends BaseRouter {
  constructor(basePath: string = "/comments") {
    const commentController = new CommentController();
    super(basePath, commentController);
  }

  protected createResource(
    middleware: RequestHandler[] = []
  ): RequestHandler<
    ParamsDictionary,
    any,
    any,
    ParsedQs,
    Record<string, any>
  >[] {
    return [
      ...middleware,
      async (req: Request, res: Response) => {
        try {
          const data = req.body;
          data.createdBy = req._user!._id;
          const savedComment = await this._controller.createDocument(data);
          return res.status(201).json({
            success: !!savedComment,
            resource: savedComment,
          });
        } catch (e) {
          return res.status(500).json({
            success: false,
            message: (e as Error).message,
          });
        }
      },
    ];
  }

  protected getResources(middleware: RequestHandler[] = []): RequestHandler[] {
    return [
      ...middleware,
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          const associatedIssue = req.query.associatedIssue
            ? new Types.ObjectId(String(req.query.associatedIssue))
            : undefined;

          const data = associatedIssue
            ? ((await this._controller
                .getModel()
                .find({
                  associatedIssue,
                })
                .populate(POPULATE_ASSOC_ISSUE)
                .populate(POPULATE_ASSOC_CREATED_BY)) as IComment[])
            : await this._controller
                .getModel()
                .find()
                .populate(POPULATE_ASSOC_ISSUE)
                .populate(POPULATE_ASSOC_CREATED_BY) as IComment[];

          response.data = data;
          response.success = !!data.length;

          return res
            .status(
              response.success
                ? ROUTER_RESPONSE_CODES.RESOURCE_FOUND
                : ROUTER_RESPONSE_CODES.RESOURCE_NOT_FOUND
            )
            .json(response);
        } catch (e) {
          response.error = (e as Error).message;
          return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
        }
      },
    ];
  }
}
