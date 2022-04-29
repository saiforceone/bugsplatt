import {Types} from 'mongoose';

import BaseRouter from "./Base.router";
import CommentController from "../resources/controllers/Comment.controller";
import { Request, Response, RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

/**
 * @class CommentRouter
 * @extends BaseRouter
 * @description Router specific to comments
 */
export default class CommentRouter extends BaseRouter {
  constructor(basePath: string = '/comments') {
    const commentController = new CommentController();
    super(basePath, commentController);
  }

  protected createResource(middleware: RequestHandler[] = []): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>[] {
    return [...middleware, async (req: Request, res: Response) => {
      try {
        const data = req.body;
        // Start Note: under normal circumstances we would never do this. We will always override this in child classes
        data.associatedIssue = new Types.ObjectId();
        data.createdBy = req._user!._id;
        // End Note
        const savedComment = await this._controller.createDocument(data);
        return res.status(201).json({
          success: !!savedComment,
          resource: savedComment
        });
      } catch (e) {
        return res.status(500).json({
          success: false,
          message: (e as Error).message,
        });
      }
    }];
  }
}
