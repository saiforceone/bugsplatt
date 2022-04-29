import {model, Schema} from 'mongoose';
import { IComment } from '../interfaces/Comment.interface';

const commentSchema = new Schema<IComment>({
  associatedIssue: {ref: 'Issue', required: true, type: Schema.Types.ObjectId},
  content: {required: true, trim: true, type: String},
  createdBy: {ref: 'UserProfile', required: true, type: Schema.Types.ObjectId},
}, {
  timestamps: true,
});

export default model<IComment>('Comment', commentSchema);
