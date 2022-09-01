import {model, Schema} from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { ITeamInvite } from "../interfaces/TeamInvite.interface";

const INVITE_STATUSES = ['pending', 'accepted', 'declined'];

const TeamInviteSchema = new Schema<ITeamInvite>({
  team: {required: true, ref: 'Team', type: Schema.Types.ObjectId, autopopulate: true},
  invitedBy: {required: true, ref: 'UserProfile', type: Schema.Types.ObjectId, autopopulate: true},
  inviteStatus: {required: true, trim: true, type: String, default: 'pending', enum: INVITE_STATUSES},
  invitedUser: {required: true, ref: 'UserProfile', type: Schema.Types.ObjectId, autopopulate: true}
}, {
  timestamps: true
});

TeamInviteSchema.plugin(mongooseAutoPopulate);

export default model<ITeamInvite>('TeamInvite', TeamInviteSchema);
