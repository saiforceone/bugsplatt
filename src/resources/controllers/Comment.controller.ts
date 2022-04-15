import BaseController from "./Base.controller";
import CommentModel from "../models/Comment.model";

export default class CommentController extends BaseController {

  constructor() {
    super(CommentModel);
  }

}
