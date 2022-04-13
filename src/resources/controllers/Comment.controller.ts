import { IComment } from "../interfaces/Comment.interface";
import CommentModel from "../models/Comment.model";
import { DEFAULT_PAGE_LIMIT } from "../constants";

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
  
    return CommentModel.find(queryObj).skip(page * DEFAULT_PAGE_LIMIT).limit(DEFAULT_PAGE_LIMIT);
  }

}
