import BaseRouter from "./Base.router";
import CommentController from "../resources/controllers/Comment.controller";

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
}
