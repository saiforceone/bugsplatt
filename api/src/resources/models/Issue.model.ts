import {model, Schema} from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { IIssue } from '../interfaces/Issue.interface';
import { ISSUE_PRIORITIES } from '../helpers/model.helpers';

const issueSchema = new Schema<IIssue>({
  createdBy: {ref: 'UserProfile', required: true, type: Schema.Types.ObjectId, autopopulate: true},
  assignedTo: {ref: 'UserProfile', required: true, type: Schema.Types.ObjectId, autopopulate: true},
  associatedProject: {ref: 'Project', required: true, type: Schema.Types.ObjectId, autopopulate: true},
  description: {required: true, trim: true, type: String},
  expectedCloseDate: {type: Date},
  priority: {enum:ISSUE_PRIORITIES, required: true, trim: true, type: String},
  status: {required: true, trim: true, type: String},
  tags: {
    type: [String],
  },
  title: {required: true, trim: true, type: String},
  watchedBy: {
    type: [{type: Schema.Types.ObjectId, ref: 'UserProfile', autopopulate: true}],
  },
}, {
  timestamps: true,
});

issueSchema.plugin(mongooseAutoPopulate);

export default model('Issue', issueSchema);