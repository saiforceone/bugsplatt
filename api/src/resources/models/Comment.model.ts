import {model, Schema} from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { IComment } from '../interfaces/Comment.interface';

const commentSchema = new Schema<IComment>({
  associatedIssue: {ref: 'Issue', required: true, type: Schema.Types.ObjectId},
  content: {required: true, trim: true, type: String},
  createdBy: {ref: 'UserProfile', required: true, type: Schema.Types.ObjectId, autopopulate: true},
}, {
  timestamps: true,
});

commentSchema.plugin(mongooseAutoPopulate);

export default model<IComment>('Comment', commentSchema);
