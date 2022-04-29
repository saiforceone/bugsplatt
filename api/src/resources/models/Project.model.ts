import {model, Schema} from 'mongoose';
import { IProject } from '../interfaces/Project.interface';
import { PROJECT_TYPES } from '../helpers/model.helpers';

const projectSchema = new Schema<IProject>({
  createdBy: {ref: 'UserProfile', required: true, type: Schema.Types.ObjectId},
  associatedTeam: {ref: 'Team', required: true, type: Schema.Types.ObjectId},
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

export default model<IProject>('Project', projectSchema);