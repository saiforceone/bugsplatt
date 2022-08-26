import {model, Schema} from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import { ITeam } from '../interfaces/Team.interface';

const teamSchema = new Schema<ITeam>({
  managedBy: {ref: 'UserProfile', required: true, type: Schema.Types.ObjectId, autopopulate: true},
  teamName: {required: true, trim: true, type: String},
  teamDescription: {required: true, trim: true, type: String},
  teamImage: {trim: true, type: String},
  teamMembers: {
    ref: 'UserProfile',
    type: [Schema.Types.ObjectId],
    autopopulate: true
  }
}, {
  timestamps: true,
});

teamSchema.plugin(mongooseAutoPopulate);

export default model<ITeam>('Team', teamSchema);
