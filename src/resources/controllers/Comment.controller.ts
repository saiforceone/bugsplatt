import { IComment } from "../interfaces/Comment.interface";
import CommentModel from "../models/Comment.model";

export default class CommentController {
  public async createComment(data: Partial<IComment>) {
    return CommentModel.create(data);
  }

  public async findCommentById(id: string) {
    return CommentModel.findById(id);
  }

  public async findCommentByQuery(queryObj: object) {
    return CommentModel.findOne(queryObj);
  }

  public async findComments(queryObj: object, page: number, ignorePagination: boolean) {
    // queryObject: {associatedIssue: ObjectId('...')}
    if (ignorePagination) {
      return CommentModel.find(queryObj);
    }
    // TODO: define page limit as constant or pass as param / arg
    return CommentModel.find(queryObj).skip(page * 10).limit(10);
  }

}
