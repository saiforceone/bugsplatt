import {RequestHandler, Router} from 'express';
import {Model} from 'mongoose';
import BaseRouter, { ROUTER_RESPONSE_CODES, ROUTER_RESPONSE_MESSAGES } from "./Base.router";
import ReactionController from "../resources/controllers/Reaction.controller";
import CommentModel from '../resources/models/Comment.model';
import { IComment } from '../resources/interfaces/Comment.interface';


export default class ReactionRouter extends BaseRouter {

  private _commentModel: Model<IComment>

  constructor(basePath: string = '/reactions') {
    const reactionController = new ReactionController();
    super(basePath, reactionController);
    this._commentModel = CommentModel;
  }

  getReactionsForComment(): RequestHandler[] {
    return [async (req, res) => {
      const response = this.getDefaultResponse();
      try {
        const commentId = req.query.commentId;

        const commentObj = this._commentModel.findById(commentId);

        if (!commentObj) {
          response.error = ROUTER_RESPONSE_MESSAGES.RES_NOT_FOUND;
          return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
        }

        response.data = await this._controller.getDocuments({
          associatedComment: commentId,
        });
        response.success = !!response.data;
        return res.status(ROUTER_RESPONSE_CODES.RESOURCE_FOUND).json(response);

      } catch (e) {
        response.error = (e as Error).message;
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response)
      }
    }];
  }
  
  public getRoutes(): Router {
    this._router.route(`${this._basePath}`)
      .get(this.getReactionsForComment());
    return this._router;
  }
}
