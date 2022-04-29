import {model, Schema} from 'mongoose';
import { IIssue } from '../interfaces/Issue.interface';
import { ISSUE_PRIORITIES } from '../helpers/model.helpers';

const issueSchema = new Schema<IIssue>({
  createdBy: {ref: 'UserProfile', required: true, type: Schema.Types.ObjectId},
  assignedTo: {ref: 'UserProfile', required: true, type: Schema.Types.ObjectId},
  associatedProject: {ref: 'Project', required: true, type: Schema.Types.ObjectId},
  description: {required: true, trim: true, type: String},
  expectedCloseDate: {type: Date},
  priority: {enum:ISSUE_PRIORITIES, required: true, trim: true, type: String},
  status: {required: true, trim: true, type: String},
  tags: {
    type: [String],
  },
  title: {required: true, trim: true, type: String},
  watchedBy: {
    type: [Schema.Types.ObjectId],
  },
}, {
  timestamps: true,
});

export default model('Issue', issueSchema);