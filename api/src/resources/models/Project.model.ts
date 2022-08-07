import {model, Schema} from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { IProject } from '../interfaces/Project.interface';
import { PROJECT_TYPES } from '../helpers/model.helpers';

const projectSchema = new Schema<IProject>({
  createdBy: {ref: 'UserProfile', index: true, required: true, type: Schema.Types.ObjectId, autopopulate: true},
  associatedTeam: {ref: 'Team', index: true, required: true, type: Schema.Types.ObjectId, autopopulate: true},
  projectName: {required: true, trim: true, type: String},
  description: {required: true, trim: true, type: String},
  projectType: {enum: PROJECT_TYPES, required: true, trim: true, type: String,},
  endDate: {type: Date,},
  colorCode: {trim: true, type: String},
  tags: {
    type: [String]
  }
}, {
  timestamps: true,
});

projectSchema.plugin(mongooseAutoPopulate);

export default model<IProject>('Project', projectSchema);