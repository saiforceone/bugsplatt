import {Types} from "mongoose";
import { IBase } from "./Base.interface";

export interface ITeamInvite extends IBase {
  invitedBy: Types.ObjectId;
  team: Types.ObjectId;
  invitedUser: Types.ObjectId;
  inviteStatus: string;
}